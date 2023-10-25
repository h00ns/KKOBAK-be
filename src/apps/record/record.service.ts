import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRecordResponseDto } from './dtos/get-record.response.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  async getRecord({
    userId,
    year,
    month,
  }: {
    userId: number;
    year: number;
    month: number;
  }): Promise<GetRecordResponseDto> {
    const data = await this.recordRepository.find({
      where: {
        user: { id: userId },
        year,
        month,
      },
    });

    const income = data
      .filter((record) => record.type === 'income')
      .reduce((acc, cur) => acc + cur.value, 0);

    const outcome = data
      .filter((record) => record.type === 'outcome')
      .reduce((acc, cur) => acc + cur.value, 0);

    const balance = income - outcome;

    return {
      income,
      outcome,
      balance,
    };
  }
}
