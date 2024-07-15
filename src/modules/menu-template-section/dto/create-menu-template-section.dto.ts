import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuTemplateSectionDto {
  @IsNotEmpty()
  @ApiProperty()
  menuTemplateId: number;

  @IsNotEmpty()
  @ApiProperty()
  sectionId: number;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;

  @IsOptional()
  @ApiProperty()
  updatedBy?: number;

  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}
