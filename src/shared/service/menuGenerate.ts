import { ChannelGroupStore } from '@modules/channel-group-store/entities/channel-group-store.entity';
import { AxiosInstance } from 'axios';
import { GygLog } from 'src/shared';
import { JobStatus, JobType, Loglevel } from 'src/context';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { transformationTemplateId } from '../gygMapping';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { UUID } from 'crypto';

export const generateMenu = async (
  channelGroupStores: ChannelGroupStore[],
  restaurant: Resto365Restaurant,
  bhvyeHttp: AxiosInstance,
  logger: GygLog,
  resto365JobService: Resto365JobService,
  resto365RestaurantService: Resto365RestaurantService,
  user: Resto365User,
  correlationId: string,
) => {
  const actionName = 'generateMenu';
  try {
    if (!restaurant.isActive || !restaurant.needMenuGenerate) {
      logger.writeLog(
        `${actionName} - Restaurant is not active`,
        restaurant.id,
        correlationId,
        Loglevel.WARN,
      );
      return undefined;
    }

    const promise = channelGroupStores.map(async (channelGroupStore) => {
      const { storeId, channelId, channel, groupId } = channelGroupStore;

      const payload = {
        storeId,
        channelId,
        groupId,
        transformationTemplateId,
      };

      try {
        logger.writeLog(`${actionName} - request`, payload, correlationId);
        const { data } = await bhvyeHttp.post('/menu/generate', payload);
        logger.writeLog(`${actionName} - response`, data, correlationId);

        if (data.id) {
          const createJob = {
            jobId: data.id,
            restaurantId: restaurant.id,
            channelId,
            status: JobStatus.CREATED,
            jobType: JobType.MENU_GENERATION,
            request: JSON.stringify(payload),
            createdBy: user.id,
            description: channel.name,
          };

          logger.writeLog(
            `${actionName} - CreateJob`,
            createJob,
            correlationId,
          );

          await resto365JobService.create(createJob);
        } else
          logger.writeLog(
            `${actionName} - Job id not found`,
            data,
            correlationId,
            Loglevel.WARN,
          );
      } catch (error) {
        logger.writeLog(actionName, error, correlationId, Loglevel.ERROR);
      }
    });

    await Promise.all(promise);

    restaurant = await resto365RestaurantService.updateNeedMenuGenerateFlag(
      restaurant.id,
      Number(false),
      correlationId as UUID,
    );
  } catch (error) {
    throw error;
  }
};
