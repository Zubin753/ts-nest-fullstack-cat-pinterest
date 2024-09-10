import { Module } from '@nestjs/common';
import { UsersController } from './users.conroller';
import { UsersService } from './users.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { Like } from '../likes/likes.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Like]),
    JwtModule.register({
      signOptions: { algorithm: 'RS256' },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
