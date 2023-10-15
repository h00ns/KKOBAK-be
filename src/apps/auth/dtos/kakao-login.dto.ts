import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class KakaoLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
