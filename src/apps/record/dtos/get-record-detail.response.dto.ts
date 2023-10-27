import { ApiProperty } from '@nestjs/swagger';

export class GetRecordDetailResponseDto {
  @ApiProperty({
    example: Array(3).fill({
      title: '월급',
      value: 2000000,
      type: 'income',
      year: 2023,
      month: 12,
      day: 12,
    }),
  })
  list: {
    title: string;
    value: number;
    type: string;
    year: number;
    month: number;
    day: number;
  }[];
}
