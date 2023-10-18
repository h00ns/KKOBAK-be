import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  accessToken: string;

  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  refreshToken: string;
}
