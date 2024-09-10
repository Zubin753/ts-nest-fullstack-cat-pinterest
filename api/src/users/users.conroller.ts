import { Body, Controller, Get, Post, Res, Headers } from '@nestjs/common';
import { UsersService } from './users.servise';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IUserAndLikes } from '../types/types';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @Post()
  async create(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const userInfo = await this.usersService.createUser(userDto);
    res.setHeader('Authorization', `Bearer ${userInfo.token}`);
    res.send();
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<IUserAndLikes> {
    return this.usersService.login(userDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя по токену' })
  @Get('/login/auth')
  authByToken(
    @Headers() headers: Record<string, string>,
  ): Promise<IUserAndLikes> {
    const token = headers['authorization'].split(' ')[1];
    return this.usersService.auth(token);
  }
}
