import { ApiProperty } from '@nestjs/swagger';

export class KakaoLoginResponseDto {
  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  accessToken: string;

  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  refreshToken: string;
}
