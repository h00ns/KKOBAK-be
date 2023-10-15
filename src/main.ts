import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './interceptors/api-response-interceptor';
import { HttpExceptionFilter } from './filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 Validation Pipe (유효성 검사)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성은 거른다.
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 리퀘스트 자체를 막는다.
      transform: true, // 컨트롤러에서 받은 값을 원하는 타입으로 변환해준다.
    }),
  );

  // 전역 Exception Filter (에러처리)
  app.useGlobalFilters(new HttpExceptionFilter());

  // 전역 Api Response Interceptor (응답처리)
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  // CORS 허용
  app.enableCors({ origin: 'http://localhost:5173' });

  await app.listen(3000);
}
bootstrap();
