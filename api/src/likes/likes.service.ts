import {
  BadRequestException,
  HttpCode,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './likes.model';
import { UsersService } from '../users/users.servise';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private userService: UsersService,
  ) {}

  async createLike(dto: CreateLikeDto): Promise<Like> {
    const { cat_id, user_id, created_at } = dto;
    const user: User = await this.userService.getUserById(user_id);
    if (user === null) {
      throw new HttpException('Пользователь не найден', 405);
    }
    const alreadyEx = await this.likeRepository.findBy({
      user: { id: user_id },
      cat_id: dto.cat_id,
    });
    if (alreadyEx.length) {
      throw new HttpException('Попытка поставить лайк дважды', 405);
    }
    const like = this.likeRepository.create({ cat_id, user, created_at });
    return await this.likeRepository.save(like);
  }

  async getLikes(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  async deleteLike(id: string): Promise<void> {
    const res = await this.likeRepository.delete({ cat_id: id });
    if (res.affected === 0) {
      throw new HttpException(`Лайк к фотке с id ${id} не найден`, 404);
    }
  }

  async getLikesUser(user_id: number) {
    const res = await this.likeRepository.findBy({ user: { id: user_id } });
    return res;
  }

  async deleteLikeUser(id_cat: string, id_user: number) {
    const res = await this.likeRepository.delete({
      cat_id: id_cat,
      user: { id: id_user },
    });
    if (res.affected === 0) {
      throw new HttpException(`Лайк к фотке с id ${id_cat} не найден`, 404);
    }
  }
}
