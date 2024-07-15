import { Global } from '@nestjs/common';
import type { DynamicModule } from '@nestjs/common';
import { ConfigModule as NestDotEnv } from '@nestjs/config';

import { ConfigService } from './config.service';
@Global()
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [NestDotEnv.forRoot()],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
