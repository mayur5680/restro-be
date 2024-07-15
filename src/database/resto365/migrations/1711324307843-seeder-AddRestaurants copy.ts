import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import restaurants from '../migrations-data/restaurants.json';

export class AddRestaurants1711324307843 implements MigrationInterface {
  name = 'AddRestaurants1711324307843';
  repo: Repository<Resto365Restaurant>;

  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Restaurant);
  }

  public async up(): Promise<void> {
    const restaurantData =
      restaurants as unknown as Partial<Resto365Restaurant>[];
    await this.repo.save(restaurantData);
  }

  public async down(): Promise<void> {
    // Get the IDs of the restaurants added in the up method
    const restaurantIds = restaurants.map(
      (restaurant: unknown) => (restaurant as { id: string }).id,
    );

    // Delete the restaurants based on their IDs
    await this.repo.delete(restaurantIds);
  }
}
