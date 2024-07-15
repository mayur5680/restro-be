import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuTemplateSectionOverrideDto {
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
  menuTemplateId: number;

  @IsNumber()
  @ApiProperty()
  sectionId: number;

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
  @ApiProperty()
  createdBy: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  updatedBy?: number;
}
