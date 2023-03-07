import { IsString } from 'class-validator';

export class authDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
