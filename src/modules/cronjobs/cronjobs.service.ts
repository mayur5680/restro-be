import { JobService } from '@modules/job/job.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GygLog } from 'src/shared';
import { randomUUID } from 'crypto';
import { JobStatus, JobType, Loglevel } from 'src/context';
import { Resto365NotificationService } from '@modules/resto365-notification/resto365-notification.service';
import { compact, isEmpty } from 'lodash';

@Injectable()
export class CronjobsService {
  logger: GygLog;
  constructor(
    private readonly resto365JobService: Resto365JobService,
    private readonly jobService: JobService,
    private readonly notificationService: Resto365NotificationService,
  ) {
    this.logger = new GygLog(CronjobsService.name);
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async jobStatus() {
    const actionName = 'jobStatus';
    const correlationId = randomUUID();
    try {
      this.logger.writeLog(actionName, 'Started...', correlationId);

      const jobs = await this.resto365JobService.findActiveJobsByJobType(
        JobType.MENU_GENERATION,
      );
      this.logger.writeLog(
        actionName,
        `jobs found - ${jobs.length}`,
        correlationId,
      );

      if (jobs.length) {
        const ids = jobs.map((job) => job.jobId);
        const bhyveJobs = await this.jobService.findByIds(ids);

        let updateJob = jobs.map((job) => {
          const findJob = bhyveJobs.find(
            (bhyveJob) => bhyveJob.id == job.jobId,
          );

          if (findJob)
            return {
              ...job,
              status: findJob.status,
              updatedAt: new Date(),
            };
        });

        updateJob = compact(updateJob);

        this.logger.writeLog(
          actionName,
          `Update jobs - ${JSON.stringify(updateJob)}`,
          correlationId,
        );

        if (!isEmpty(updateJob))
          await this.resto365JobService.upsert(updateJob);

        for (const job of updateJob) {
          switch (job.status) {
            case JobStatus.CREATED:
              this.logger.info(
                actionName,
                `Job created, job id ${job.jobId}`,
                correlationId,
              );
              this.notificationService.sendNotification({
                category: 'menu',
                message: `Menu generating in progress`,
                userId: job.createdBy,
              });
              break;
            case JobStatus.COMPLETED:
              this.logger.info(
                actionName,
                `Job completed, job id ${job.jobId}`,
                correlationId,
              );
              this.notificationService.sendNotification({
                category: 'menu',
                message: `Menu generation completed`,
                userId: job.createdBy,
              });
              break;
            case JobStatus.FAILED:
              this.logger.info(
                actionName,
                `Job failed, job id ${job.jobId}`,
                correlationId,
              );
              this.notificationService.sendNotification({
                category: 'menu',
                message: `Menu generation failed`,
                userId: job.createdBy,
              });
              break;
          }
        }
      }
    } catch (error) {
      this.logger.writeLog(actionName, error, correlationId, Loglevel.ERROR);
    }
  }
}
