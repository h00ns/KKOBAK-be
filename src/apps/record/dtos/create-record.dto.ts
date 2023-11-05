import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({
    example: '월급',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 2000000,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    example: 'income',
  })
  @IsIn(['income', 'outcome'], { message: '잘못된 형식입니다.' })
  type: 'income' | 'outcome';

  @ApiProperty({
    example: 2023,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  month: number;

  @ApiProperty({
    example: 31,
  })
  @IsNumber()
  day: number;

  @ApiProperty({
    example: 201,
  })
  @IsNumber()
  code: number;
}
