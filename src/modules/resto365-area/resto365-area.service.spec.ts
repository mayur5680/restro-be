import { Test, TestingModule } from '@nestjs/testing';
import { Resto365AreaService } from './resto365-area.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365Area } from './entities/resto365-area.entity';
import { Repository } from 'typeorm';

describe('Resto365AreaService', () => {
  let service: Resto365AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365AreaService,
        {
          provide: getRepositoryToken(Resto365Area, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365AreaService>(Resto365AreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
