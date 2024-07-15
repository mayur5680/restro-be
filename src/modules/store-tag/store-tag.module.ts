import { Module } from '@nestjs/common';
import { StoreTagService } from './store-tag.service';
import { StoreTagController } from './store-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreTag } from './entities/store-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreTag])],
  controllers: [StoreTagController],
  providers: [StoreTagService],
  exports: [StoreTagService],
})
export class StoreTagModule {}
