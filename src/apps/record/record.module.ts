import { Module } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { UserModule } from '../user/user.module';
import { FilterModule } from '../filter/filter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule, FilterModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
