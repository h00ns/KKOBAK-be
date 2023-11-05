import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRecordsResponseDto } from './dtos/get-records.response.dto';
import { CreateRecordDto } from './dtos/create-record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  // 해당 달의 통계 조회
  async getRecords({
    userId,
    year,
    month,
  }: {
    userId: number;
    year: number;
    month: number;
  }): Promise<GetRecordsResponseDto> {
    const list = await this.recordRepository.find({
      where: {
        user: { id: userId },
        year,
        month,
      },
      relations: ['filter'],
    });

    const income = list
      .filter((record) => record.type === 'income')
      .reduce((acc, cur) => acc + cur.value, 0);

    const outcome = list
      .filter((record) => record.type === 'outcome')
      .reduce((acc, cur) => acc + cur.value, 0);

    const balance = income - outcome;

    return {
      income,
      outcome,
      balance,
      list,
    };
  }

  // 가계부 기록 생성
  async createRecord(
    userId: number,
    filterId: number,
    { title, value, type, year, month, day }: Omit<CreateRecordDto, 'code'>,
  ) {
    const record = this.recordRepository.create({
      title,
      value,
      type,
      year,
      month,
      day,
      user: { id: userId },
      filter: { id: filterId },
    });

    return await this.recordRepository.save(record);
  }

  // 해당 일의 목록 조회
  async getRecordDetail({
    userId,
    year,
    month,
    day,
  }: {
    userId: number;
    year: number;
    month: number;
    day: number;
  }) {
    const list = await this.recordRepository.find({
      where: {
        user: { id: userId },
        year,
        month,
        day,
      },
      relations: ['filter'],
    });

    return list;
  }
}
