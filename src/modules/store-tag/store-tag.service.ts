import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateStoreTagDto } from './dto/create-store-tag.dto';
import { UpdateStoreTagDto } from './dto/update-store-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreTag } from './entities/store-tag.entity';
import { Repository } from 'typeorm';
import { exceptionWrapper } from 'src/shared';
import { AuditParams } from 'src/shared/audit-logs.types';

@Injectable()
export class StoreTagService {
  logger: Logger;
  constructor(
    @InjectRepository(StoreTag)
    private storeTagRepository: Repository<StoreTag>,
  ) {
    this.logger = new Logger(StoreTagService.name);
  }

  async create(createStoreTagDto: CreateStoreTagDto, auditParams: AuditParams) {
    try {
      const storeTag = new StoreTag();
      storeTag.storeId = createStoreTagDto.storeId;
      storeTag.tagId = createStoreTagDto.tagId;
      storeTag.isActive = createStoreTagDto.isActive ? 1 : 0;
      (storeTag.createdBy = createStoreTagDto.createdBy),
        (storeTag.updatedBy = createStoreTagDto.updatedBy);

      return await this.storeTagRepository.save({
        ...storeTag,
        ...auditParams,
      });
    } catch (error) {
      throw new Error(`Failed to create StoreTag: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.storeTagRepository.findOne({
        where: { id: Number(id) },
        relations: ['tag'],
      });

      if (!result) {
        throw new NotFoundException(`StoreTag with ID ${id} not found.`);
      }

      return result;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new Error(`Failed to retrieve StoreTag: ${error.message}`);
      }

      exceptionWrapper(error);
    }
  }

  public async findAll(): Promise<StoreTag[]> {
    return this.storeTagRepository.find();
  }

  public async findOneByStoreIdAndTagId(
    storeId: number,
    tagId: number,
  ): Promise<StoreTag> {
    return this.storeTagRepository.findOne({
      where: { storeId, tagId },
    });
  }

  public async findAllByTagId(tagId: number): Promise<StoreTag[]> {
    return this.storeTagRepository.find({
      where: { tagId },
    });
  }

  public async findAllByStoreId(storeId: number): Promise<StoreTag[]> {
    return this.storeTagRepository.find({
      where: { storeId },
    });
  }

  public async findAllByStoreIdAndTagId(
    storeId: number,
    tagId: number,
  ): Promise<StoreTag[]> {
    return this.storeTagRepository.find({
      where: { storeId, tagId },
    });
  }

  async update(id: number, updateStoreTagDto: UpdateStoreTagDto) {
    try {
      // Log the update operation
      this.logger.log(`Updating StoreTag with ID ${id}...`);

      const result = await this.storeTagRepository.update(
        { id: id },
        {
          tagId: updateStoreTagDto.tagId,
          isActive: updateStoreTagDto.isActive ? 1 : 0,
        },
      );

      if (result.affected === 0) {
        throw new NotFoundException(`StoreTag with ID ${id} not found.`);
      }

      // Log the successful update
      this.logger.log(`StoreTag with ID ${id} updated successfully.`);

      return await this.findOne(String(id));
    } catch (error) {
      // Log the error
      this.logger.error(
        `Failed to update StoreTag with ID ${id}: ${error.message}`,
      );

      if (!(error instanceof NotFoundException)) {
        throw new Error(`Failed to update StoreTag: ${error.message}`);
      }

      exceptionWrapper(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.storeTagRepository.delete({ id: id });

      if (result.affected === 0) {
        throw new NotFoundException(`StoreTag with ID ${id} not found.`);
      }

      return `StoreTag with ID ${id} has been successfully removed.`;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new Error(`Failed to remove StoreTag: ${error.message}`);
      }

      exceptionWrapper(error);
    }
  }

  async findOrCreate(
    storeId: number,
    tagId: number,
    isActive: boolean,
    auditParams: AuditParams,
  ) {
    try {
      const storeTag = await this.findOneByStoreIdAndTagId(storeId, tagId);

      if (storeTag) {
        return storeTag;
      }

      return await this.create(
        {
          storeId,
          tagId,
          isActive,
        },
        auditParams,
      );
    } catch (error) {
      throw new Error(`Failed to find or create StoreTag: ${error.message}`);
    }
  }

  async findOneByStoreAndTagId(
    storeId: number,
    tagId: number,
  ): Promise<StoreTag | null> {
    try {
      const result = await this.storeTagRepository.findOne({
        where: { storeId, tagId },
      });

      return result || null; // Return null if result is falsy (i.e., not found)
    } catch (error) {
      throw new Error(`Failed to retrieve StoreTag: ${error.message}`);
    }
  }

  async updateOrCreate(
    updateStoreTagDto: UpdateStoreTagDto,
    auditParams: AuditParams,
  ) {
    try {
      let storeTag = await this.findOneByStoreIdAndTagId(
        updateStoreTagDto.storeId,
        updateStoreTagDto.tagId,
      );

      if (storeTag) {
        // If store tag exists, update it
        storeTag.isActive = updateStoreTagDto.isActive ? 1 : 0;
        await this.storeTagRepository.save(storeTag);
      } else {
        // If store tag does not exist, create it
        const createStoreTagDto: CreateStoreTagDto = {
          storeId: updateStoreTagDto.storeId,
          tagId: updateStoreTagDto.tagId,
          isActive: updateStoreTagDto.isActive,
        };
        storeTag = await this.create(createStoreTagDto, auditParams);
      }

      return storeTag;
    } catch (error) {
      throw new Error(`Failed to update or create StoreTag: ${error.message}`);
    }
  }

  async upsert(upsertStoreTagDto: UpdateStoreTagDto, auditParams: AuditParams) {
    try {
      // Attempt to find the existing StoreTag
      let storeTag = await this.findOneByStoreIdAndTagId(
        upsertStoreTagDto.storeId,
        upsertStoreTagDto.tagId,
      );

      if (storeTag) {
        // If the StoreTag exists, update it
        storeTag.isActive = upsertStoreTagDto.isActive ? 1 : 0;
        await this.storeTagRepository.save({ ...storeTag, ...auditParams });
      } else {
        // If the StoreTag doesn't exist, create a new one
        const createStoreTagDto: CreateStoreTagDto = {
          storeId: upsertStoreTagDto.storeId,
          tagId: upsertStoreTagDto.tagId,
          isActive: upsertStoreTagDto.isActive,
        };
        storeTag = await this.create(createStoreTagDto, auditParams);
      }

      return storeTag;
    } catch (error) {
      throw new Error(`Failed to upsert StoreTag: ${error.message}`);
    }
  }
}
