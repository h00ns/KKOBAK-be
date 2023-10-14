import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.userService.findUserByEmail({ email });

    if (!user) {
      throw new HttpException('존재하지 않는 이메일입니다.', 400);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return {
        result: 'good',
        message: '로그인 성공',
      };
    }

    throw new HttpException('비밀번호가 일치하지 않습니다.', 400);
  }
}
