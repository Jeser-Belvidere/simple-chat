import { IsString } from 'class-validator';

export class ViewUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly createdAt: string;
}
