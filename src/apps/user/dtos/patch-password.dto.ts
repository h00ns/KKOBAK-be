import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatchPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak123@@',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'zxcasdqwe123',
  })
  readonly resetCode: string;
}
