import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, { data: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data: T }> {
    return next.handle().pipe(
      map((data) => {
        // If the response has meta property. it means that its paginated response, so we do not need to put inside another `data`
        if (data?.['meta']) {
          return { data: data?.['data'], meta: data?.['meta'] };
        }
        return { data };
      }),
    );
  }
}
