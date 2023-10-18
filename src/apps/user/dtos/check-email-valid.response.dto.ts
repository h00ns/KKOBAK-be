import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailValidResponseDto {
  @ApiProperty({
    example: false,
  })
  isDuplicate: boolean;
}
