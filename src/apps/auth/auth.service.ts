import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken({ id, email }: Payload) {
    const payload: Payload = { id, email };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '300s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken);
  }
}
