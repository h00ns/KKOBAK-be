import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max } from 'class-validator';

export class PatchSalaryDayDto {
  @IsNotEmpty({ message: '월급일을 입력해주세요.' })
  @IsInt({ message: '월급일은 정수여야 합니다.' })
  @Max(31, { message: '월급일은 31을 초과할 수 없습니다.' })
  @ApiProperty({
    example: '10',
  })
  readonly salaryDay: number;
}
