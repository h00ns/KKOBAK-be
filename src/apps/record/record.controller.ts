import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';

@ApiTags('record')
@Controller('record')
export class RecordController {
  constructor(readonly recordService: RecordService) {}
}
