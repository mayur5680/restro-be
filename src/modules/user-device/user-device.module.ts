import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDeviceService } from './user-device.service';
import { UserDeviceController } from './user-device.controller';
import { UserDevice } from './entities/user-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevice])],
  controllers: [UserDeviceController],
  providers: [UserDeviceService],
})
export class UserDeviceModule {}
