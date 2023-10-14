import { Module } from '@nestjs/common';
import typeOrmConfig from '../typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
