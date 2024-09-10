import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLikeDto, CreateLikeWUDto } from './dto/create-like.dto';
import { UsersService } from '../users/users.servise';

@ApiTags('Лайки')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание лайка' })
  @Post()
  async newLike(
    @Body() likeForCat: CreateLikeWUDto,
    @Headers() headers: Record<string, string>,
  ) {
    const cat_id = likeForCat.cat_id;
    const date = likeForCat.created_at;
    if (headers['authorization']) {
      const token = headers['authorization'].split(' ')[1];
      const user = await this.userService.auth(token);
      const user_id = user.user.id;
      return this.likesService.createLike({
        cat_id,
        user_id,
        created_at: date,
      });
    } else {
      throw new HttpException({ message: 'Токен не получен' }, 401);
    }
  }
  @ApiOperation({ summary: 'Получение лайков пользователя' })
  @HttpCode(200)
  @Get()
  async listLike(@Headers() headers: Record<string, string>) {
    if (headers['authorization']) {
      const token = headers['authorization'].split(' ')[1];
      const user = await this.userService.auth(token);
      return this.likesService.getLikesUser(user.user.id);
    } else {
      throw new HttpException({ message: 'Токен не получен' }, 401);
    }
  }

  @ApiOperation({ summary: 'Удаление лайка' })
  @HttpCode(200)
  @Delete('/:cat_id')
  async dropLike(
    @Param('cat_id') cat_id: string,
    @Headers() headers: Record<string, string>,
  ) {
    if (headers['authorization']) {
      const token = headers['authorization'].split(' ')[1];
      const user = await this.userService.auth(token);
      return this.likesService.deleteLikeUser(cat_id, user.user.id);
    } else {
      throw new HttpException({ message: 'Токен не получен' }, 401);
    }
  }
}
