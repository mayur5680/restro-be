import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import restaurants from '../migrations-data/10_06_2023_restaurant.json';

export class UpdateRestaurants1717835439233 implements MigrationInterface {
  name = 'UpdateRestaurants1717835439233';
  repo: Repository<Resto365Restaurant>;

  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Restaurant);
  }

  public async up(): Promise<void> {
    const restaurantData =
      restaurants as unknown as Partial<Resto365Restaurant>[];

    for (const restaurant of restaurantData) {
      await this.repo.update(restaurant.id, restaurant);
    }
  }

  public async down(): Promise<void> {}
}
