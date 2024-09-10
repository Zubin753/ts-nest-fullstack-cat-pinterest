import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Like } from '../likes/likes.model';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
