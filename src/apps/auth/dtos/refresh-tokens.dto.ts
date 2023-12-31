import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'zxcasdqwe123qweasdzxc123==',
  })
  refreshToken: string;
}
