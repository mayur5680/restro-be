import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { Resto365JobModule } from '@modules/resto365-job/resto365-job.module';
import { JobModule } from '@modules/job/job.module';
import { Resto365NotificationModule } from '@modules/resto365-notification/resto365-notification.module';

@Module({
  imports: [Resto365JobModule, JobModule, Resto365NotificationModule],
  providers: [CronjobsService],
})
export class CronjobsModule {}
