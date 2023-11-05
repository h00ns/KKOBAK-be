import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';
import { FilterService } from './filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filter])],
  controllers: [],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}
