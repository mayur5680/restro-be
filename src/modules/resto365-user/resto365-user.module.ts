import { Module, forwardRef } from '@nestjs/common';
import { Resto365UserService } from './resto365-user.service';
import { Resto365UserController } from './resto365-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365User } from './entities/resto365-user.entity';
import { Resto365CountryModule } from '@modules/resto365-country/resto365-country.module';
import { AuthModule } from '@modules/auth/auth.module';
import { OktaUserModule } from '@modules/okta-user/okta-user.module';
import { Resto365AreaModule } from '@modules/resto365-area/resto365-area.module';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365User], 'r365'),
    Resto365CountryModule,
    OktaUserModule,
    Resto365AreaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => Resto365RestaurantModule),
  ],
  controllers: [Resto365UserController],
  providers: [Resto365UserService],
  exports: [Resto365UserService],
})
export class Resto365UserModule {}
