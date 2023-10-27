import { ApiProperty } from '@nestjs/swagger';

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
}
