import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

/** typeORM 설정 (MySQL) */
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'hoon',
  password: '1234',
  database: 'KKOBAK',
  entities: [User],
  synchronize: true,
};

export default typeOrmConfig;
