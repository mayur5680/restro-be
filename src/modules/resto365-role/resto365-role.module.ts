import { Module, forwardRef } from '@nestjs/common';
import { Resto365RoleService } from './resto365-role.service';
import { Resto365RoleController } from './resto365-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365Role } from './entities/resto365-role.entity';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365Role], 'r365'),
    forwardRef(() => AuthModule),
  ],
  controllers: [Resto365RoleController],
  providers: [Resto365RoleService],
  exports: [Resto365RoleService],
})
export class Resto365RoleModule {}
