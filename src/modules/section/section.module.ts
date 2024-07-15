import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService],
})
export class SectionModule {}
