import { User } from 'src/apps/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/signup.dto';
import { ApiRes } from 'src/dtos/api-response.dto';
import { CheckEmailValidDto } from './dtos/check-email-valid.dto';
import { SendResetCodeDto } from './dtos/send-reset-code.dto';
import { PatchPasswordDto } from './dtos/patch-password.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckEmailValidResponseDto } from './dtos/check-email-valid.response.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { GetUserInfoResponseDto } from './dtos/get-user-info-response.dto';
import { PatchSalaryDayDto } from './dtos/patch-salaryday.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    readonly userService: UserService,
    readonly s3Service: S3Service,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 자신의 정보 조회' })
  @ApiResponse({ status: 200, type: GetUserInfoResponseDto })
  async getUserInfo(@Req() req): Promise<ApiRes<GetUserInfoResponseDto>> {
    const { id } = req.user;
    const user = await this.userService.findUserById({ id });

    // 비밀번호, 재설정코드는 제외
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, resetCode, ...restUser } = user;

    if (user) {
      return {
        result: restUser,
        message: '유저 정보 조회가 완료되었습니다.',
      };
    }

    throw new HttpException(
      '유저가 존재하지 않습니다.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 200, type: User })
  async signUp(
    @Body() { email, name, password }: SignUpDto,
  ): Promise<ApiRes<User>> {
    const user = await this.userService.signUp({ email, name, password });

    return {
      result: user,
      message: '회원가입이 완료되었습니다.',
    };
  }

  @Post('/email')
  @ApiOperation({ summary: '이메일 중복 확인' })
  @ApiBody({ type: CheckEmailValidDto })
  @ApiResponse({
    status: 200,
    type: CheckEmailValidResponseDto,
  })
  async checkEmailValid(
    @Body() { email }: CheckEmailValidDto,
  ): Promise<ApiRes<CheckEmailValidResponseDto>> {
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
  @ApiOperation({ summary: '비밀번호 재설정 코드 전송' })
  @ApiBody({ type: SendResetCodeDto })
  async sendResetCode(
    @Body() { email }: SendResetCodeDto,
  ): Promise<ApiRes<null>> {
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
  @ApiOperation({ summary: '비밀번호 재설정' })
  @ApiBody({ type: PatchPasswordDto })
  async patchPassword(
    @Body() { email, password, resetCode }: PatchPasswordDto,
  ): Promise<ApiRes<null>> {
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

  @Patch('/salary')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '월급일 변경' })
  @ApiBody({ type: PatchSalaryDayDto })
  async patchSalaryDay(
    @Req() req,
    @Body() { salaryDay }: PatchSalaryDayDto,
  ): Promise<ApiRes<null>> {
    const { id } = req.user;
    const user = await this.userService.findUserById({ id });

    if (user) {
      await this.userService.patchSalaryDay(id, { salaryDay });

      return {
        result: null,
        message: '월급일이 변경되었습니다.',
      };
    }

    throw new HttpException(
      '유저가 존재하지 않습니다.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profileImg'))
  @ApiOperation({ summary: '프로필 이미지 변경' })
  async patchProfileImg(
    @Req() req,
    @UploadedFile() profileImg: Express.Multer.File,
  ) {
    const { id } = req.user;

    const fileUrl = await this.s3Service.uploadFileS3(id, profileImg);

    this.userService.patchProfileImg(id, fileUrl);

    return {
      result: {
        profileImg: fileUrl,
      },
      message: '프로필 이미지가 변경되었습니다.',
    };
  }
}
