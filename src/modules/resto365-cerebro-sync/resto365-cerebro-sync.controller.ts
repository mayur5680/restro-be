import { Controller } from '@nestjs/common';
import { Resto365CerebroSyncService } from './resto365-cerebro-sync.service';

@Controller('resto365-cerebro-sync')
export class Resto365CerebroSyncController {
  constructor(
    private readonly resto365CerebroSyncService: Resto365CerebroSyncService,
  ) {}
}
