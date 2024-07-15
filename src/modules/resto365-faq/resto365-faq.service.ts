import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOperator } from 'typeorm';

import { CreateResto365FaqDto } from './dto/create-resto365-faq.dto';
import { UpdateResto365FaqDto } from './dto/update-resto365-faq.dto';
import { FaqCategory, Resto365Faq } from './entities/resto365-faq.entity';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

@Injectable()
export class Resto365FaqService {
  constructor(
    @InjectRepository(Resto365Faq, 'r365')
    private readonly faqRepository: Repository<Resto365Faq>,
  ) {}

  async findAll(): Promise<Resto365Faq[]> {
    try {
      const result = await this.faqRepository.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Resto365Faq> {
    try {
      const faq = await this.faqRepository.findOne({
        where: { id },
      });
      if (!faq) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      return faq;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createFaqDto: CreateResto365FaqDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365Faq> {
    try {
      const faq = this.faqRepository.create({
        ...createFaqDto,
        createdBy: user.id,
        updatedBy: user.id,
        ...auditParams,
      });
      return await this.faqRepository.save(faq);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateFaqDto: UpdateResto365FaqDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365Faq> {
    try {
      const faq = await this.findOne(id);
      if (!faq) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }

      // Check if any field in the updateFaqDto is undefined and assign only defined fields to faq
      Object.keys(updateFaqDto).forEach((key) => {
        if (updateFaqDto[key] !== undefined) {
          faq[key] = updateFaqDto[key];
        }
      });

      return await this.faqRepository.save({
        ...faq,
        updatedBy: user.id,
        ...auditParams,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(
    id: number,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<void> {
    try {
      const faq = await this.findOne(id);
      if (!faq) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      await this.faqRepository.remove({
        ...faq,
        deletedBy: user.id,
        ...auditParams,
      });
    } catch (error) {
      throw error;
    }
  }

  async searchFaqByTitle(title: string): Promise<Resto365Faq[]> {
    try {
      return await this.faqRepository.find({
        where: { title: ILike(`%${title}%`) },
      });
    } catch (error) {
      throw error;
    }
  }

  async searchFaqByCategory(
    category: FaqCategory | FindOperator<FaqCategory>,
  ): Promise<Resto365Faq[]> {
    try {
      return await this.faqRepository.find({ where: { category } });
    } catch (error) {
      throw error;
    }
  }

  async searchFaqByDocumentUrl(documentUrl: string): Promise<Resto365Faq[]> {
    try {
      return await this.faqRepository.find({
        where: { documentUrl: ILike(`%${documentUrl}%`) },
      });
    } catch (error) {
      throw error;
    }
  }
}
