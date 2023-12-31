import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // token 생성
  async createToken({ id, email }: Payload) {
    const payload: Payload = { id, email };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '300s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  // refresh token 검증
  verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken);
  }
}
