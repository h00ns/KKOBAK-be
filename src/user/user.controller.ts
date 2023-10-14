import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/\bsignup-user.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('/')
  async signUp(@Body() { email, name, password }: SignUpUserDto) {
    return await this.userService.signUp({ email, name, password });
  }

  @Get('/email')
  async checkEmailValid(@Query('email') email: string) {
    return await this.userService.checkEmailValid({ email });
  }
}
