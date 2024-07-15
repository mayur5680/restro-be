import { Test, TestingModule } from '@nestjs/testing';
import { Resto365JobController } from './resto365-job.controller';
import { Resto365JobService } from './resto365-job.service';
import { Repository } from 'typeorm';
import { Resto365Job } from './entities/resto365-job.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

class MockService {
  async findAll() {
    return [];
  }
}
describe('Resto365JobController', () => {
  let controller: Resto365JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365JobController],
      providers: [
        Resto365JobService,
        {
          provide: getRepositoryToken(Resto365Job, 'r365'),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockService,
        },
      ],
    }).compile();

    controller = module.get<Resto365JobController>(Resto365JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
