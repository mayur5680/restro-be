import { Module } from '@nestjs/common';
import { OktaUserService } from './okta-user.service';
import { OktaUserController } from './okta-user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [OktaUserController],
  providers: [OktaUserService],
  imports: [HttpModule],
  exports: [OktaUserService],
})
export class OktaUserModule {}
