import { Module } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
