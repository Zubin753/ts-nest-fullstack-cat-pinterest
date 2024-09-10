import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.model';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cat_id: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @Column({ nullable: false })
  created_at: string;
}
