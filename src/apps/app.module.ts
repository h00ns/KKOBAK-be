import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import typeOrmConfig from 'src/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from 'src/config/mailer.config';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(mailerConfig),
    UserModule,
    AuthModule,
    RecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
