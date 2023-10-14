import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/\bsignup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 이메일 중복 체크
  async checkEmailValid({ email }: { email: string }) {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  // 회원가입
  async signUp({ email, name, password }: SignUpUserDto) {
    const user = await this.userRepository.create({ email, name, password });

    return await this.userRepository.save(user);
  }
}
