import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 이메일로 유저 검색
  async findUserByEmail({ email }: { email: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  // 회원가입
  async signUp({ email, name, password }: SignUpUserDto): Promise<User> {
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
}
