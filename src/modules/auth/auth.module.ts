import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Resto365RoleModule } from '@modules/resto365-role/resto365-role.module';
import { Resto365UserModule } from '@modules/resto365-user/resto365-user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    Resto365RoleModule,
    forwardRef(() => Resto365UserModule),
    HttpModule,
  ],
})
export class AuthModule {}
