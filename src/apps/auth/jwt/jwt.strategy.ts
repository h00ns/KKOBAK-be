import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더 Authentication 에서 Bearer 토큰으로부터 jwt를 추출함
      secretOrKey: 'SECRET', // jwt 생성시 비밀키로 사용할 텍스트 (노출 X)
      ignoreExpiration: true, // jwt 만료를 무시할 것인지 (기본값: false)
    });
  }

  async validate(payload: Payload & { iat: number; exp: number }) {
    const { id, email, exp } = payload;
    const expire = exp * 1000;

    if (id && email) {
      // 토큰 유효
      if (Date.now() < expire) {
        return { id, email };
      }
      throw new HttpException('토큰 만료', HttpStatus.UNAUTHORIZED);
    } else {
      throw new HttpException('접근 오류', HttpStatus.FORBIDDEN);
    }
  }
}
