import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kkobak123@@',
  })
  readonly password: string;
}
