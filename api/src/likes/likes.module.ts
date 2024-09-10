import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.model';
import { Like } from './likes.model';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [TypeOrmModule.forFeature([User, Like]), UsersModule],
})
export class LikesModule {}
