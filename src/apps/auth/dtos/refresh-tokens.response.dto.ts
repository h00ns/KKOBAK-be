import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensResponseDto {
  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  accessToken: string;
}
