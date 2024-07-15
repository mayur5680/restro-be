import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateMenuTemplateSectionContainerDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  menuTemplateSectionId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  menuContainerPosPlu?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  updatedBy?: number;
}
