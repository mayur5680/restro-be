import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CountryController } from './resto365-country.controller';
import { Resto365CountryService } from './resto365-country.service';

describe('Resto365CountryController', () => {
  let controller: Resto365CountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CountryController],
      providers: [
        {
          provide: Resto365CountryService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<Resto365CountryController>(
      Resto365CountryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
