import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { Ilike, IUserAndLikes } from '../types/types';

@Injectable()
export class UsersService {
  private readonly privateKey: string;
  private readonly publicKey: string;
  constructor(
    @InjectRepository(User)
    private UserReposytory: Repository<User>,
    private JwtServise: JwtService,
  ) {
    this.privateKey = fs.readFileSync('private.key', 'utf8');
    this.publicKey = fs.readFileSync('public.key', 'utf8');
  }
  async createUser(dto: CreateUserDto): Promise<IUserAndLikes> {
    const isExists = await this.getUserByLogin(dto.login);
    if (isExists) {
      throw new HttpException({ message: 'Данный логин уже занят' }, 405);
    }
    this.checkDataValid(dto);
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user: User = await this.UserReposytory.save({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  checkDataValid(dto: CreateUserDto) {
    const { login, password } = dto;
    const validLogin = /^[0-9A-Za-z]{4,16}$/;
    const validPassword = /^[0-9A-Za-z.,/?*]{6,16}$/;
    if (!validLogin.test(login)) {
      if (login.length < 4 || login.length > 16) {
        throw new HttpException(
          {
            message: 'Длина логина должна быть от 4 до 16 символов',
          },
          405,
        );
      }
      throw new HttpException(
        {
          message:
            'Логин может содержать только цифры 0-9, строчные и заглавные латинские буквы',
        },
        405,
      );
    }
    if (!validPassword.test(password)) {
      if (password.length < 6 || password.length > 16) {
        throw new HttpException(
          {
            message: 'Длина пароля должна быть от 6 до 16 символов',
          },
          405,
        );
      }
      throw new HttpException(
        {
          message:
            'Пароль может содержать только цифры 0-9, строчные и заглавные латинские буквы, символы: .,/?*',
        },
        405,
      );
    }
  }
  async login(dto: CreateUserDto): Promise<IUserAndLikes> {
    const user: User = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private generateToken(user: User): IUserAndLikes {
    const like: Ilike[] = user.likes ? user.likes : ([] as Ilike[]);
    const payload: { login: string; id: number; likes: Ilike[] } = {
      login: user.login,
      id: user.id,
      likes: like,
    };
    const token: string = this.JwtServise.sign(payload, {
      privateKey: this.privateKey,
      algorithm: 'RS256',
    });
    return {
      token: token,
      user: {
        login: user.login,
        id: user.id,
        likes: user.likes,
      },
    };
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.getUserByLogin(dto.login);
    if (!user) {
      throw new HttpException(
        { message: 'Неккоректный логин или пароль' },
        400,
      );
    }
    const passwordEq = await bcrypt.compare(dto.password, user.password);
    if (passwordEq) {
      return user;
    }
    throw new HttpException({ message: 'Неккоректный логин или пароль' }, 400);
  }

  async auth(token: string): Promise<IUserAndLikes | null> {
    try {
      const decoded = this.JwtServise.verify(token, {
        publicKey: this.publicKey,
        algorithms: ['RS256'],
      });
      const user = await this.getUserByLogin(decoded.login);
      if (user) {
        return this.generateToken(user);
      }
      throw new HttpException(
        {
          message: 'Неизвестный юзер',
        },
        404,
      );
    } catch (error) {
      throw new HttpException(
        {
          message: 'Неизвестный токен',
        },
        404,
      );
    }
  }

  async getUserByLogin(login: string): Promise<User | null> {
    if (login === undefined) {
      throw new Error('ID is undefined');
    }
    return this.UserReposytory.findOne({
      where: { login: login },
      relations: ['likes'],
    });
  }

  async getUserById(id: number): Promise<User | null> {
    console.log(`get user by Id ${id}`);
    if (id === undefined) {
      throw new Error('ID is undefined');
    }
    return this.UserReposytory.findOne({
      where: { id: id },
      relations: ['likes'],
    });
  }
}
