import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365FaqService } from './resto365-faq.service';
import { Resto365FaqController } from './resto365-faq.controller';
import { Resto365Faq } from './entities/resto365-faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365Faq], 'r365')],
  controllers: [Resto365FaqController],
  providers: [Resto365FaqService],
  exports: [Resto365FaqService],
})
export class Resto365FaqModule {}
