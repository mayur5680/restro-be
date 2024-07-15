import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Healthy!"', () => {
      expect(controller.getHealthCheck()).resolves.toBe('Healthy!');
    });
  });
});
