import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  nis: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
