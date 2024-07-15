import { Test, TestingModule } from '@nestjs/testing';
import { Resto365AreaController } from './resto365-area.controller';
import { Resto365AreaService } from './resto365-area.service';

describe('Resto365AreaController', () => {
  let controller: Resto365AreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365AreaController],
      providers: [
        {
          provide: Resto365AreaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<Resto365AreaController>(Resto365AreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
