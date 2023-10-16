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
import { KakaoLoginDto } from './dtos/kakao-login.dto';
import { randomBytes } from 'crypto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dtos/login.response.dto';
import { RefreshTokensResponseDto } from './dtos/refresh-tokens.response.dto';
import { KakaoLoginResponseDto } from './dtos/kakao-login.response.dto';
import { ApiRes } from 'src/dtos/api-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
  async login(
    @Body() { email, password }: LoginDto,
  ): Promise<ApiRes<LoginResponseDto>> {
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
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  @ApiBody({
    type: RefreshTokensDto,
  })
  @ApiResponse({
    status: 200,
    type: RefreshTokensResponseDto,
  })
  async refreshTokens(
    @Body() { refreshToken }: RefreshTokensDto,
  ): Promise<ApiRes<RefreshTokensResponseDto>> {
    const payload = this.authService.verifyRefreshToken(refreshToken);

    const { accessToken } = await this.authService.createToken(payload);

    return {
      result: { accessToken },
      message: '토큰 갱신 성공',
    };
  }

  @Post('/kakao')
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiBody({
    type: KakaoLoginDto,
  })
  @ApiResponse({
    status: 200,
    type: KakaoLoginResponseDto,
  })
  async kakaoLogin(
    @Body() { email, name }: KakaoLoginDto,
  ): Promise<ApiRes<KakaoLoginResponseDto>> {
    const user = await this.userService.findUserByEmail({ email });

    if (user) {
      const payload = { id: user.id, email, name };
      const { accessToken, refreshToken } =
        await this.authService.createToken(payload);

      return {
        result: { accessToken, refreshToken },
        message: '로그인 성공',
      };
    }

    if (!user) {
      // 최초 로그인 => 회원정보 DB에 저장 (가입)
      const password = randomBytes(6).toString('hex'); // 비밀번호는 무작위로 등록
      const user = await this.userService.signUp({ email, name, password });

      const payload = { id: user.id, email, name };
      const { accessToken, refreshToken } =
        await this.authService.createToken(payload);

      return {
        result: { accessToken, refreshToken },
        message: '로그인 성공',
      };
    }
  }
}
