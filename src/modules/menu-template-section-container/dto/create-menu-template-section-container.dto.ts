import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMenuTemplateSectionContainerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  menuTemplateSectionId?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  menuContainerPosPlu?: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  createdBy?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  updatedBy?: number;
}
