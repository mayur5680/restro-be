import { PartialType } from '@nestjs/swagger';
import { CreateResto365RestaurantTempDto } from './create-resto365-restaurant-temp.dto';

export class UpdateResto365RestaurantTempDto extends PartialType(
  CreateResto365RestaurantTempDto,
) {}
