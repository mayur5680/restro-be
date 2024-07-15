import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { GygLog } from 'src/shared';
import { Resto365Notification } from './entities/resto365-notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export type NotificationCategory = 'restaurant' | 'menu';
type Notification = {
  userId: number;
  message: string;
  category: NotificationCategory;
  time?: Date;
};
@Injectable()
export class Resto365NotificationService {
  logger = new GygLog(Resto365NotificationService.name);
  private notificationQueue = new Subject<Notification>();
  public notificationQueue$ = this.notificationQueue.asObservable();

  constructor(
    @InjectRepository(Resto365Notification, 'r365')
    private readonly notificationRepository: Repository<Resto365Notification>,
  ) {}

  sendNotification(notification: Notification) {
    const { message, category, userId, time } = notification;
    this.logger.info(
      this.sendNotification.name,
      `Sending notification ${notification.message}`,
      userId.toString(),
    );
    this.notificationQueue.next({
      message,
      category,
      userId,
      time: time ?? new Date(),
    });
  }

  findByUserId(userId: number) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async create(notification: Notification) {
    await this.notificationRepository.save(notification);
  }
}
