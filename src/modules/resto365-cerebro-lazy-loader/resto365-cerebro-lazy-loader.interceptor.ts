import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CerebroLazyLoadService } from './resto365-cerebro-lazy-loader.service';

@Injectable()
export class Resto365CerebroLazyLoaderInterceptor implements NestInterceptor {
  constructor(private readonly cerebroLazyLoader: CerebroLazyLoadService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
    /* eslint-disable @typescript-eslint/no-explicit-any */
  ): Promise<Observable<any>> {
    await this.cerebroLazyLoader.init();
    return next.handle();
  }
}
