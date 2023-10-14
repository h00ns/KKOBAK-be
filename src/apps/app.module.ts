import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import typeOrmConfig from 'src/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from 'src/config/mailer.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    MailerModule.forRoot(mailerConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
