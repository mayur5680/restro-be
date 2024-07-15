import { Module } from '@nestjs/common';
import { CerebroProductService } from './cerebro-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CerebroProduct } from './entities/cerebro-product.entity';
import { ConfigService } from '@modules/config/config.service';
import { typeormConfig } from 'src/typeorm.config';

@Module({
  imports: [
    // TODO: Combine all Cerebro* modules so typeorm connection is only defined once
    TypeOrmModule.forRootAsync({
      name: 'cerebro',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeormConfig(configService).cerebro,
    }),
    TypeOrmModule.forFeature([CerebroProduct], 'cerebro'),
  ],
  providers: [CerebroProductService],
  exports: [CerebroProductService],
})
export class CerebroProductModule {}
