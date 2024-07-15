import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupStoreService } from './group-store.service';
import { GroupStoreController } from './group-store.controller';
import { GroupStore } from './entities/group-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupStore])],
  controllers: [GroupStoreController],
  providers: [GroupStoreService],
  exports: [GroupStoreService],
})
export class GroupStoreModule {}
