import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class KakaoLoginDto {
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @ApiProperty({
    example: 'kkobak123@@',
  })
  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;
}
