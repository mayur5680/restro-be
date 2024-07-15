import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMenuTemplateSectionOverrideDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  groupId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  channelId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  storeId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  menuTemplateId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  sectionId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  displayOrder?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  updatedBy: number;
}
