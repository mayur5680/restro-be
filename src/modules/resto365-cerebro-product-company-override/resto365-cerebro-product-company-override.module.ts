import { Module } from '@nestjs/common';
import { Resto365CerebroProductCompanyOverrideService } from './resto365-cerebro-product-company-override.service';
import { Resto365CerebroProductCompanyOverrideController } from './resto365-cerebro-product-company-override.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365CerebroProductCompanyOverride } from './entities/resto365-cerebro-product-company-override.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365CerebroProductCompanyOverride], 'r365'),
  ],
  controllers: [Resto365CerebroProductCompanyOverrideController],
  providers: [Resto365CerebroProductCompanyOverrideService],
  exports: [Resto365CerebroProductCompanyOverrideService],
})
export class Resto365CerebroProductCompanyOverrideModule {}
