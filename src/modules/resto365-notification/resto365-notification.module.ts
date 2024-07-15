import { Module } from '@nestjs/common';
import { NotificationGateway } from './resto365-notification.gateway';
import { AuthModule } from '@modules/auth/auth.module';
import { Resto365NotificationService } from './resto365-notification.service';
import { Resto365NotificationController } from './resto365-notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365Notification } from './entities/resto365-notification.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Resto365Notification], 'r365'),
  ],
  providers: [NotificationGateway, Resto365NotificationService],
  exports: [Resto365NotificationService],
  controllers: [Resto365NotificationController],
})
export class Resto365NotificationModule {}
