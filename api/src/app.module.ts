import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { Like } from './likes/likes.model';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'cat-pinterest-api-pg',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1',
      database: process.env.POSTGRES_DB || 'support_lk_db',
      entities: [User, Like],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    LikesModule,
  ],
})
export class AppModule {}
