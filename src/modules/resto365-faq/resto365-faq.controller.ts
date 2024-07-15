import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { Resto365FaqService } from './resto365-faq.service';
import { CreateResto365FaqDto } from './dto/create-resto365-faq.dto';
import { UpdateResto365FaqDto } from './dto/update-resto365-faq.dto';
import { FaqCategory, Resto365Faq } from './entities/resto365-faq.entity';
import { FindOperator } from 'typeorm';

import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import isEmpty from 'lodash/isEmpty';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';

import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';

@Audit('Faq')
@Controller('resto365-faq')
export class Resto365FaqController {
  logger: GygLog;
  constructor(private readonly faqService: Resto365FaqService) {
    this.logger = new GygLog(Resto365FaqController.name);
  }

  @Get()
  @Acl('read:faq')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({
    status: 200,
    description: 'List of FAQs',
    type: Resto365Faq,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365Faq[]> {
    try {
      this.logger.writeLog(
        `Finding all FAQs`,
        `Finding all FAQs requested by ${user.email}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.faqService.findAll();
      if (isEmpty(result)) {
        this.logger.writeLog(
          `No FAQs found`,
          `No FAQs found requested by ${user.email}`,
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException('No FAQs found');
      }
      this.logger.writeLog(
        `Found all FAQs`,
        `Found all FAQs requested by ${user.email}`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        `Failed to find all FAQs`,
        `Failed to find all FAQs requested by ${user.email}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:faq')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get a single FAQ' })
  @ApiQuery({
    name: 'Find a single FAQ by ID',
    type: 'string',
    description: 'Find a single FAQ with the given ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Single FAQ',
    type: Resto365Faq,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365Faq> {
    try {
      this.logger.writeLog(
        `Finding a single FAQ`,
        `Finding a single FAQ with ID ${id}`,
        correlationId,
        Loglevel.INFO,
      );
      const faq = await this.faqService.findOne(Number(id));
      if (!faq) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      return faq;
    } catch (error) {}
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create a FAQ' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Resto365Faq,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createFaqDto: CreateResto365FaqDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365Faq>> {
    try {
      this.logger.writeLog(
        `Creating a FAQ`,
        `Creating a FAQ with title ${createFaqDto.title}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.faqService.create(createFaqDto, user, {
        _metadata: {
          auditUser: user,
          correlationId: correlationId,
        },
      });
      if (!result) {
        this.logger.writeLog(
          `Failed to create FAQ`,
          `Failed to create FAQ with title ${createFaqDto.title}`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new InternalServerErrorException('Failed to create FAQ');
      }
      this.logger.writeLog(
        `FAQ created successfully`,
        `FAQ created successfully with title ${createFaqDto.title}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Faq,
          entitySourceId: result.id,
          description: `FAQ created successfully`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Failed to create FAQ`,
        `Failed to create FAQ with title ${createFaqDto.title}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a FAQ' })
  @ApiQuery({
    name: 'updateFaq by ID',
    type: 'string',
    description: 'Update a FAQ with the given ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: Resto365Faq,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateResto365FaqDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365Faq>> {
    try {
      this.logger.writeLog(
        `Updating a FAQ`,
        `Updating a FAQ with title ${updateFaqDto.title}`,
        correlationId,
        Loglevel.INFO,
      );
      const faq = await this.faqService.update(Number(id), updateFaqDto, user, {
        _metadata: { auditUser: user, correlationId: correlationId },
      });
      if (!faq) {
        this.logger.writeLog(
          `Updating a FAQ failed`,
          `FAQ with title ${updateFaqDto.title} not found`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `FAQ with title ${updateFaqDto.title} not found`,
        );
      }
      this.logger.writeLog(
        `FAQ updated successfully`,
        `FAQ updated successfully with title ${updateFaqDto.title}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: faq,
        _metadata: {
          entitySource: EntitySource.Faq,
          entitySourceId: faq.id,
          description: `FAQ updated successfully`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Failed to update FAQ`,
        `Failed to update FAQ with title ${updateFaqDto.title}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete a FAQ' })
  @ApiQuery({
    name: 'deleteFaq by ID',
    type: 'string',
    description: 'Delete a FAQ with the given ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @Param('id') id: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      this.logger.writeLog(
        `Deleting a FAQ`,
        `Deleting a FAQ with ID ${id}`,
        correlationId,
        Loglevel.INFO,
      );
      await this.faqService.remove(Number(id), user, {
        _metadata: { auditUser: user, correlationId: correlationId },
      });
      this.logger.writeLog(
        `FAQ deleted successfully`,
        `FAQ deleted successfully with ID ${id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: `FAQ with ID ${id} deleted successfully`,
        _metadata: {
          entitySource: EntitySource.Faq,
          entitySourceId: Number(id),
          description: `FAQ deleted successfully`,
        },
      };
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Get('searchByTitle/:title')
  @Acl('read:faq')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Search FAQ by title' })
  @ApiQuery({
    name: 'Search FAQ by title',
    type: 'string',
    description: 'Search FAQ by title',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'List of FAQs',
    type: Resto365Faq,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async searchByTitle(@Param('title') title: string): Promise<Resto365Faq[]> {
    return await this.faqService.searchFaqByTitle(title);
  }

  @Get('searchByCategory/:category')
  @Acl('read:faq')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Search FAQ by category' })
  @ApiQuery({
    name: 'Search FAQ by category',
    type: 'string',
    description: 'Search FAQ by category',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'List of FAQs',
    type: Resto365Faq,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async searchByCategory(
    @Param('category') category: FaqCategory | FindOperator<FaqCategory>,
  ): Promise<Resto365Faq[]> {
    return await this.faqService.searchFaqByCategory(category);
  }

  @Get('searchByDocumentUrl/:documentUrl')
  @Acl('read:faq')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Search FAQ by document URL' })
  @ApiQuery({
    name: 'Search FAQ by document URL',
    type: 'string',
    description: 'Search FAQ by document URL',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'List of FAQs',
    type: Resto365Faq,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async searchByDocumentUrl(
    @Param('documentUrl') documentUrl: string,
  ): Promise<Resto365Faq[]> {
    return await this.faqService.searchFaqByDocumentUrl(documentUrl);
  }

  @Get('listFaqCategories/categories') // New endpoint for FAQ categories
  @ApiOperation({ summary: 'Get FAQ categories' })
  @ApiResponse({
    status: 200,
    description: 'List of FAQ categories',
    type: String,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getFaqCategory(): Promise<string[]> {
    // Extracting enum values from the FaqCategory enum
    const faqCategory: string[] = Object.values(FaqCategory);
    return faqCategory;
  }
}
