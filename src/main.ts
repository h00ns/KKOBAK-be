import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성은 거른다.
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 리퀘스트 자체를 막는다.
      transform: true, // 컨트롤러에서 받은 값을 원하는 타입으로 변환해준다.
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
