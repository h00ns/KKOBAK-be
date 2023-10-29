import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SendResetCodeDto } from './dtos/send-reset-code.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { PatchPasswordDto } from './dtos/patch-password.dto';
import { randomBytes } from 'crypto';
import { PatchSalaryDayDto } from './dtos/patch-salaryday.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  // 이메일로 유저 검색
  async findUserByEmail({ email }: { email: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  // 아이디로 유저 검색
  async findUserById({ id }: { id: number }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  // 회원가입
  async signUp({ email, name, password }: SignUpDto): Promise<User> {
    // password hash 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  // 비밀번호 찾기 이메일 전송
  async sendResetCode({ email }: SendResetCodeDto) {
    // 인증코드 생성, 비밀번호 초기화
    const resetCode = randomBytes(6).toString('hex');
    const defaultPassword = randomBytes(6).toString('hex');

    await this.userRepository.update(
      { email },
      { resetCode, password: defaultPassword },
    );

    await this.mailerService.sendMail({
      to: email,
      subject: '비밀번호 재설정 인증번호',
      template: 'reset-password',
      context: {
        email: email,
        resetCode: resetCode,
      },
    });
  }

  // 비밀번호 변경
  async patchPassword({ email, password }: PatchPasswordDto) {
    // password hash 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.userRepository.update(
      { email },
      { password: hashedPassword, resetCode: null },
    );
  }

  // 월급일 변경
  async patchSalaryDay(id: number, { salaryDay }: PatchSalaryDayDto) {
    await this.userRepository.update({ id }, { salaryDay });
  }
}
