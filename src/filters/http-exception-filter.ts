import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = exceptionResponse.hasOwnProperty('message')
      ? Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message'].join(', ')
        : exceptionResponse['message']
      : exceptionResponse;

    response.status(status).json({
      code: status,
      message,
      result: null,
    });
  }
}
