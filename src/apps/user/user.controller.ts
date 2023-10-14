import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { ApiResponse } from 'src/dtos/api-response.dto';
import { User } from './entities/user.entity';
import { CheckEmailValidDto } from './dtos/check-email-valid.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('/')
  async signUp(
    @Body() { email, name, password }: SignUpUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.userService.signUp({ email, name, password });

    return {
      result: user,
      message: '회원가입이 완료되었습니다.',
    };
  }

  @Post('/email')
  async checkEmailValid(@Body() { email }: CheckEmailValidDto) {
    const user = await this.userService.findUserByEmail({ email });

    if (user) {
      throw new HttpException(
        '이미 사용중인 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      result: { isDuplicate: false },
      message: '이메일 중복 체크가 완료되었습니다.',
    };
  }
}
