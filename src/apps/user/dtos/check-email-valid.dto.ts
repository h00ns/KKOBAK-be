import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailValidDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
