import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Controller, Get } from '@nestjs/common';
import { Resto365NotificationService } from './resto365-notification.service';

@Controller('resto365-notifications')
export class Resto365NotificationController {
  constructor(
    private readonly notificationService: Resto365NotificationService,
  ) {}

  @Get('/my')
  async my(@User() user: Resto365User) {
    const notifications = await this.notificationService.findByUserId(user.id);
    return notifications.map((n) => ({ ...n, read: true }));
  }
}
