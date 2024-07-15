import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserIdentity } from './userIdentity.entity';
import { UserIdentityController } from './userIdentity.controller';
import { UserIdentityService } from './userIdentity.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserIdentity])],
  providers: [UserIdentityService],
  controllers: [UserIdentityController],
})
export class UserIdentityModule {}
