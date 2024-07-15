import { Test, TestingModule } from '@nestjs/testing';
import { Resto365JobService } from './resto365-job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365Job } from './entities/resto365-job.entity';
import { Repository } from 'typeorm';

describe('Resto365JobService', () => {
  let service: Resto365JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365JobService,
        {
          provide: getRepositoryToken(Resto365Job, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365JobService>(Resto365JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
