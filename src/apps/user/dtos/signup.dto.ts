import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @ApiProperty({
    example: 'kkobak',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @ApiProperty({
    example: 'kkobak123@@',
  })
  readonly password: string;
}
