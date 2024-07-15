import { Test, TestingModule } from '@nestjs/testing';
import { CronjobsService } from './cronjobs.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { JobService } from '@modules/job/job.service';
import { Resto365NotificationService } from '@modules/resto365-notification/resto365-notification.service';

class MockService {
  async findAll() {
    return [];
  }
}
describe('CronjobsService', () => {
  let service: CronjobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronjobsService,
        {
          provide: Resto365JobService,
          useClass: MockService,
        },
        {
          provide: JobService,
          useClass: MockService,
        },
        {
          provide: Resto365NotificationService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CronjobsService>(CronjobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
