import { ApiProperty } from '@nestjs/swagger';

export class GetUserInfoResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'kkobak@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'kkobak',
  })
  name: string;

  @ApiProperty({
    example: null,
  })
  salaryDay: number;

  @ApiProperty({
    example: '2023-10-24T11:06:27.515Z',
  })
  createdAt: Date;
}
