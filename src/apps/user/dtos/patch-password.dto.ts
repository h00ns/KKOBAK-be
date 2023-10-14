import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatchPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly resetCode: string;
}
