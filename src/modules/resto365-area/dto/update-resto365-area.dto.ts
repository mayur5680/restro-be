import { PartialType } from '@nestjs/mapped-types';
import { CreateResto365AreaDto } from './create-resto365-area.dto';

export class UpdateResto365AreaDto extends PartialType(CreateResto365AreaDto) {}
