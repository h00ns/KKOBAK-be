import { ApiProperty } from '@nestjs/swagger';
import { Filter } from 'src/apps/filter/entities/filter.entity';

export class GetRecordsResponseDto {
  @ApiProperty({
    example: 2000000,
  })
  @ApiProperty({
    example: 2000000,
  })
  income: number;

  @ApiProperty({
    example: 500000,
  })
  outcome: number;

  @ApiProperty({
    example: 1500000,
  })
  balance: number;

  @ApiProperty({
    example: Array(3).fill({
      title: '월급',
      value: 2000000,
      type: 'income',
      year: 2023,
      month: 12,
      day: 12,
      filter: {
        id: 1,
        name: '월급',
        code: 101,
      },
    }),
  })
  list: {
    id: number;
    title: string;
    value: number;
    type: 'income' | 'outcome';
    year: number;
    month: number;
    day: number;
    filter: Filter;
  }[];
}
