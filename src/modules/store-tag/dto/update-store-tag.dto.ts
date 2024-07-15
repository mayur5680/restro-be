import { PartialType } from '@nestjs/swagger';
import { CreateStoreTagDto } from './create-store-tag.dto';

export class UpdateStoreTagDto extends PartialType(CreateStoreTagDto) {}
