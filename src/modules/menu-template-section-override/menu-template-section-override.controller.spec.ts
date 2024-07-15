import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateSectionOverrideController } from './menu-template-section-override.controller';
import { MenuTemplateSectionOverrideService } from './menu-template-section-override.service';
import { CreateMenuTemplateSectionOverrideDto } from './dto/create-menu-template-section-override.dto';
import { MenuTemplateSectionOverride } from './entities/menu-template-section-override.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MenuTemplateSectionOverrideController', () => {
  let controller: MenuTemplateSectionOverrideController;
  let service: MenuTemplateSectionOverrideService;

  const mockCreateDto: CreateMenuTemplateSectionOverrideDto = {
    menuTemplateId: 1,
    sectionId: 1,
    createdBy: 1,
    updatedBy: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTemplateSectionOverrideController],
      providers: [
        MenuTemplateSectionOverrideService,
        {
          provide: getRepositoryToken(MenuTemplateSectionOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuTemplateSectionOverrideController>(
      MenuTemplateSectionOverrideController,
    );
    service = module.get<MenuTemplateSectionOverrideService>(
      MenuTemplateSectionOverrideService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu template section override', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(
          mockCreateDto as unknown as MenuTemplateSectionOverride,
        );

      const result = await controller.create(mockCreateDto);
      expect(result).toEqual(mockCreateDto);
    });

    it('should throw a NotFoundException if the menu template section override is not found', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException());

      await expect(controller.create(mockCreateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all menu template section overrides', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([
          mockCreateDto,
        ] as unknown as MenuTemplateSectionOverride[]);

      const result = await controller.findAll();
      expect(result).toEqual([mockCreateDto]);
    });
  });

  describe('findOne', () => {
    it('should return a menu template section override by ID', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(
          mockCreateDto as unknown as MenuTemplateSectionOverride,
        );

      const result = await controller.findOne(1);
      expect(result).toEqual(mockCreateDto);
    });
  });

  describe('remove', () => {
    it('should remove a menu template section override by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the menu template section override is not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
