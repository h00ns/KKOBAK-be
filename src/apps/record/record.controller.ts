import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { GetRecordResponseDto } from './dtos/get-record.response.dto';
import { ApiRes } from 'src/dtos/api-response.dto';

@ApiTags('record')
@Controller('record')
export class RecordController {
  constructor(readonly recordService: RecordService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 달의 통계 조회' })
  @ApiQuery({ name: 'year', example: 2023 })
  @ApiQuery({ name: 'month', example: 12 })
  @ApiResponse({ status: 200, type: GetRecordResponseDto })
  async getRecord(
    @Req() req,
    @Query('year') year: number,
    @Query('month') month: number,
  ): Promise<ApiRes<GetRecordResponseDto>> {
    const { id: userId } = req.user;

    const record = await this.recordService.getRecord({ userId, year, month });

    return {
      result: record,
      message: '해당 달의 통계 조회 성공',
    };
  }
}
