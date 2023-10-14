import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { ApiResponse } from 'src/dtos/api-response.dto';
import { User } from './entities/user.entity';
import { CheckEmailValidDto } from './dtos/check-email-valid.dto';
import { SendResetCodeDto } from './dtos/send-reset-code.dto';
import { PatchPasswordDto } from './dtos/patch-password.dto';

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

  @Post('/reset')
  async sendResetCode(@Body() { email }: SendResetCodeDto) {
    const user = await this.userService.findUserByEmail({ email });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.sendResetCode({ email });

    return {
      result: null,
      message: '인증번호를 이메일로 발송하였습니다.',
    };
  }

  @Patch('/password')
  async patchPassword(
    @Body() { email, password, resetCode }: PatchPasswordDto,
  ) {
    const user = await this.userService.findUserByEmail({ email });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (resetCode !== user.resetCode) {
      throw new HttpException(
        '인증번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.patchPassword({ email, password, resetCode });

    return {
      result: null,
      message: '비밀번호가 변경되었습니다.',
    };
  }
}
