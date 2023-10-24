import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRes } from 'src/dtos/api-response.dto';

@Injectable()
export class ApiResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const {
          result,
          message = '요청이 성공적으로 완료되었습니다.',
          code = HttpStatus.OK,
        } = response ?? {};

        // null도 넣어주는 값이므로 성공으로 취급
        if (result || result === null) {
          return new ApiRes(result, message, code);
        } else {
          return response;
        }
      }),
    );
  }
}
