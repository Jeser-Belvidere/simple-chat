import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsString()
  userId: string;
}
