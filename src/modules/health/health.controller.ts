import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from '@modules/auth/PublicDecorator';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  async getHealthCheck() {
    return this.healthService.getHealthCheck();
  }
}
