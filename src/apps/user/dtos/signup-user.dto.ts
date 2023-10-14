import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
