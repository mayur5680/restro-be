import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Loyalty } from '@modules/loyalty/loyalty.entity';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Loyalty])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
