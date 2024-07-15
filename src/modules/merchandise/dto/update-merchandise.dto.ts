import { PartialType } from '@nestjs/swagger';
import { CreateMerchandiseDto } from './create-merchandise.dto';

export class UpdateMerchandiseDto extends PartialType(CreateMerchandiseDto) {}
