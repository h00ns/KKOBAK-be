import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecordService } from './record.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { GetRecordsResponseDto } from './dtos/get-records.response.dto';
import { ApiRes } from 'src/dtos/api-response.dto';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UserService } from '../user/user.service';
import { GetRecordDetailResponseDto } from './dtos/get-record-detail.response.dto';
import { FilterService } from '../filter/filter.service';

@ApiTags('record')
@Controller('record')
export class RecordController {
  constructor(
    readonly recordService: RecordService,
    readonly userService: UserService,
    readonly filterService: FilterService,
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
    @Body()
    { title, value, type, year, month, day, code }: CreateRecordDto,
  ) {
    const { id: filterId } = await this.filterService.getFilterByCode(code);

    if (!filterId) {
      throw new HttpException('잘못된 코드입니다.', HttpStatus.BAD_REQUEST);
    }

    const { id: userId } = req.user;
    const record = this.recordService.createRecord(userId, filterId, {
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

    throw new HttpException('생성에 실패했습니다.', HttpStatus.BAD_REQUEST);
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

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '가계부 기록 삭제' })
  @ApiParam({ name: 'id', example: 1 })
  async deleteRecord(@Req() req, @Param('id') id: number) {
    const { id: userId } = req.user;

    const isSuccess = await this.recordService.deleteRecord(userId, id);

    if (isSuccess) {
      return {
        result: null,
        message: '가계부 기록 삭제 성공',
      };
    }

    throw new HttpException('삭제에 실패했습니다.', HttpStatus.BAD_REQUEST);
  }
}
