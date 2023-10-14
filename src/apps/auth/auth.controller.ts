import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RefreshTokensDto } from './dtos/refresh-tokens.dto';

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
      throw new HttpException(
        '존재하지 않는 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const payload = { id: user.id, email: user.email };
      const { accessToken, refreshToken } =
        await this.authService.createToken(payload);

      return {
        result: { accessToken, refreshToken },
        message: '로그인 성공',
      };
    }

    throw new HttpException(
      '비밀번호가 일치하지 않습니다.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Post('/refresh')
  async refreshTokens(@Body() { refreshToken }: RefreshTokensDto) {
    const payload = this.authService.verifyRefreshToken(refreshToken);

    const { accessToken } = await this.authService.createToken(payload);

    return {
      result: { accessToken },
      message: '토큰 갱신 성공',
    };
  }
}
