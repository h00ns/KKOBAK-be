import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Record } from 'src/apps/record/entities/record.entity';
import { User } from 'src/apps/user/entities/user.entity';

/** typeORM 설정 (MySQL) */
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'hoon',
  password: '1234',
  database: 'KKOBAK',
  entities: [User, Record],
  synchronize: false,
};

export default typeOrmConfig;
