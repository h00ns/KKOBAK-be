import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/\bsignup-user.dto';
import { ApiResponse } from 'src/dtos/api-response.dto';
import { User } from './entities/user.entity';

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

  @Get('/email')
  async checkEmailValid(@Query('email') email: string) {
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
