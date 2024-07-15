import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import {
  Ownership,
  Resto365Restaurant,
} from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import restaurants from '../migrations-data/usRestaurants.json';

import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';

export class AddUsRestaurants1715561180703 implements MigrationInterface {
  name = 'AddUsRestaurants1715561180703';
  repo: Repository<Resto365Restaurant>;

  logger: GygLog;
  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Restaurant);
    this.logger = new GygLog(AddUsRestaurants1715561180703.name);
  }

  public async up(): Promise<void> {
    try {
      const restaurantData: Partial<Resto365Restaurant>[] = restaurants.map(
        (restaurant) => ({
          ...restaurant,
          ownership: restaurant.ownership as Ownership,
          createdAt: new Date(restaurant.createdAt),
          updatedAt: new Date(restaurant.updatedAt),
          latitude: parseFloat(restaurant.latitude),
          longitude: parseFloat(restaurant.longitude),
        }),
      );

      await this.repo.save(restaurantData);
    } catch (error) {
      this.logger.writeLog(
        'up',
        `Error seeding US restaurants: ${error}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  public async down(): Promise<void> {
    try {
      const restaurantIds = restaurants.map((restaurant) => restaurant.bhyveId);

      await this.repo.delete(restaurantIds);
    } catch (error) {
      this.logger.writeLog(
        'down',
        `Error reverting US restaurants seeding: ${error}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }
}
