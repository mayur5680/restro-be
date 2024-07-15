import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthCheck(): string {
    return 'Healthy!';
  }
}
