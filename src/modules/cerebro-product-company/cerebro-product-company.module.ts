import { Module } from '@nestjs/common';
import { CerebroProductCompanyService } from './cerebro-product-company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CerebroProductCompany } from './entities/cerebro-product-company.entity';
import { ConfigService } from '@modules/config/config.service';
import { typeormConfig } from 'src/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'cerebro',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeormConfig(configService).cerebro,
    }),
    TypeOrmModule.forFeature([CerebroProductCompany], 'cerebro'),
  ],
  providers: [CerebroProductCompanyService],
  exports: [CerebroProductCompanyService],
})
export class CerebroProductCompanyModule {}
