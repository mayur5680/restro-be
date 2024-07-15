import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CountryService } from './resto365-country.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365Country } from './entities/resto365-country.entity';
import { Repository } from 'typeorm';

describe('Resto365CountryService', () => {
  let service: Resto365CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365CountryService,
        {
          provide: getRepositoryToken(Resto365Country, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365CountryService>(Resto365CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
