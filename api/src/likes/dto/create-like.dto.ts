import {
  IS_DATE,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../users/users.model';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  readonly cat_id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsString()
  @IsNotEmpty()
  readonly created_at: string;
}

export class CreateLikeWUDto {
  @IsString()
  @IsNotEmpty()
  readonly cat_id: string;

  @IsString()
  @IsNotEmpty()
  readonly created_at: string;
}
