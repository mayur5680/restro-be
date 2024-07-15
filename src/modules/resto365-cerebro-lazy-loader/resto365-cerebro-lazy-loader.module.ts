import { Module } from '@nestjs/common';
import { Resto365CerebroLazyLoaderInterceptor } from './resto365-cerebro-lazy-loader.interceptor';
import { CerebroLazyLoadService } from './resto365-cerebro-lazy-loader.service';

@Module({
  providers: [Resto365CerebroLazyLoaderInterceptor, CerebroLazyLoadService],
  exports: [Resto365CerebroLazyLoaderInterceptor, CerebroLazyLoadService],
})
export class Resto365CerebroLazyLoaderModule {}
