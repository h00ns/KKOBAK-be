import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { GetRecordsResponseDto } from './dtos/get-records.response.dto';
import { ApiRes } from 'src/dtos/api-response.dto';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UserService } from '../user/user.service';
import { GetRecordDetailResponseDto } from './dtos/get-record-detail.response.dto';

@ApiTags('record')
@Controller('record')
export class RecordController {
  constructor(
    readonly recordService: RecordService,
    readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 달의 통계 조회' })
  @ApiQuery({ name: 'year', example: 2023 })
  @ApiQuery({ name: 'month', example: 12 })
  @ApiResponse({ status: 200, type: GetRecordsResponseDto })
  async getRecords(
    @Req() req,
    @Query() { year, month },
  ): Promise<ApiRes<GetRecordsResponseDto>> {
    const { id: userId } = req.user;

    const result = await this.recordService.getRecords({ userId, year, month });

    return {
      result,
      message: '해당 달의 통계 조회 성공',
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 달 가계부 기록 생성' })
  async createRecord(
    @Req() req,
    @Body() { title, value, type, year, month, day }: CreateRecordDto,
  ) {
    const { id: userId } = req.user;
    const record = this.recordService.createRecord(userId, {
      title,
      value,
      type,
      year,
      month,
      day,
    });

    if (record) {
      return {
        result: record,
        message: '해당 달 가계부 기록 생성 성공',
      };
    }

    throw new HttpException('작성에 실패했습니다.', HttpStatus.BAD_REQUEST);
  }

  @Get('/detail')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 일의 목록 조회' })
  @ApiQuery({ name: 'year', example: 2023 })
  @ApiQuery({ name: 'month', example: 12 })
  @ApiQuery({ name: 'day', example: 12 })
  @ApiResponse({ status: 200, type: GetRecordDetailResponseDto })
  async getRecordDetail(@Req() req, @Query() { year, month, day }) {
    const { id: userId } = req.user;

    const list = await this.recordService.getRecordDetail({
      userId,
      year,
      month,
      day,
    });

    return {
      result: { list },
      message: '해당 일의 목록 조회 성공',
    };
  }
}
