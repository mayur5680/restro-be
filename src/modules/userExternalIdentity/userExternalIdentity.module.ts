import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserExternalIdentity } from './userExternalIdentity.entity';
import { UserExternalIdentityService } from './userExternalIdentity.service';
import { UserExternalIdentityController } from './userExternalIdentity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserExternalIdentity])],
  providers: [UserExternalIdentityService],
  controllers: [UserExternalIdentityController],
})
export class UserExternalIdentityModule {}
