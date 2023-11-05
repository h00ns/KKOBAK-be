import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filter } from './entities/filter.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: Repository<Filter>,
  ) {}

  // 필터 생성
  async createInitialFilter() {
    const existFilters = await this.filterRepository.find();

    if (existFilters.length === 0) {
      const initialFilters = [
        { name: '월급', code: 101 },
        { name: '이월', code: 102 },
        { name: '기타', code: 103 },
        { name: '식비', code: 201 },
        { name: '교통비', code: 202 },
        { name: '문화생활', code: 203 },
        { name: '저축', code: 204 },
        { name: '생활', code: 205 },
        { name: '카드대금', code: 206 },
        { name: '공과금', code: 207 },
        { name: '쇼핑', code: 208 },
        { name: '기타', code: 209 },
      ].map((data) => this.filterRepository.create(data));

      await this.filterRepository.save(initialFilters);
    }
  }

  async getFilterByCode(code: number) {
    return await this.filterRepository.findOne({ where: { code } });
  }
}
