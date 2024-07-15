import { Module } from '@nestjs/common';
import { Resto365CountryService } from './resto365-country.service';
import { Resto365CountryController } from './resto365-country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365Country } from './entities/resto365-country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365Country], 'r365')],
  controllers: [Resto365CountryController],
  providers: [Resto365CountryService],
  exports: [Resto365CountryService],
})
export class Resto365CountryModule {}
