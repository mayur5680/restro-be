import { PartialType } from '@nestjs/swagger';
import { CreateOktaUserDto } from './create-okta-user.dto';

export class UpdateOktaUserDto extends PartialType(CreateOktaUserDto) {}
