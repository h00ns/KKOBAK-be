import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class KakaoLoginDto {
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'kkobak123@@',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
