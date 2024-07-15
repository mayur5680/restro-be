import { Test, TestingModule } from '@nestjs/testing';
import { NotificationGateway } from './resto365-notification.gateway';
import { AuthService } from '@modules/auth/auth.service';
import { Resto365NotificationService } from './resto365-notification.service';
import { Observable } from 'rxjs';

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationGateway,
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: Resto365NotificationService,
          useValue: {
            notificationQueue$: new Observable(),
          },
        },
      ],
    }).compile();

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
