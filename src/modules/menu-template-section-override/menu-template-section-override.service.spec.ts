import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MenuTemplateSectionOverrideService } from './menu-template-section-override.service';
import { MenuTemplateSectionOverride } from './entities/menu-template-section-override.entity';
import { CreateMenuTemplateSectionOverrideDto } from './dto/create-menu-template-section-override.dto';
import { NotFoundException } from '@nestjs/common';

describe('MenuTemplateSectionOverrideService', () => {
  let service: MenuTemplateSectionOverrideService;
  let repository: Repository<MenuTemplateSectionOverride>;

  const mockCreateDto: CreateMenuTemplateSectionOverrideDto = {
    menuTemplateId: 1,
    sectionId: 1,
    createdBy: 1,
    updatedBy: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuTemplateSectionOverrideService,
        {
          provide: getRepositoryToken(MenuTemplateSectionOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuTemplateSectionOverrideService>(
      MenuTemplateSectionOverrideService,
    );
    repository = module.get<Repository<MenuTemplateSectionOverride>>(
      getRepositoryToken(MenuTemplateSectionOverride),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu template section override', async () => {
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockCreateDto as unknown as DeepPartial<MenuTemplateSectionOverride> &
            MenuTemplateSectionOverride,
        );
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(
          mockCreateDto as unknown as DeepPartial<MenuTemplateSectionOverride> &
            MenuTemplateSectionOverride,
        );

      const result = await service.create(mockCreateDto);

      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
      expect(saveSpy).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toEqual(mockCreateDto);

      createSpy.mockRestore();
      saveSpy.mockRestore();
    });
  });

  describe('findOne', () => {
    it('should return a menu template section override by ID', async () => {
      const mockMenuTemplateSectionOverride = new MenuTemplateSectionOverride();
      mockMenuTemplateSectionOverride.id = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockMenuTemplateSectionOverride);

      const result = await service.findOne(1);
      expect(result).toEqual(mockMenuTemplateSectionOverride);
    });
  });

  describe('findAll', () => {
    it('should return an array of menu template section overrides', async () => {
      const mockMenuTemplateSectionOverrides = [
        new MenuTemplateSectionOverride(),
      ];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSectionOverrides);

      const result = await service.findAll();
      expect(result).toEqual(mockMenuTemplateSectionOverrides);
    });
  });

  describe('findAllByStoreId', () => {
    it('should return an array of menu template section overrides by store ID', async () => {
      const mockMenuTemplateSectionOverrides = [
        new MenuTemplateSectionOverride(),
      ];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSectionOverrides);

      const result = await service.findAllByStoreId(1);
      expect(result).toEqual(mockMenuTemplateSectionOverrides);
    });
  });

  describe('findAllBySectionId', () => {
    it('should return an array of menu template section overrides by section ID', async () => {
      const mockMenuTemplateSectionOverrides = [
        new MenuTemplateSectionOverride(),
      ];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSectionOverrides);

      const result = await service.findAllBySectionId(1);
      expect(result).toEqual(mockMenuTemplateSectionOverrides);
    });
  });

  describe('findAllByStoreIdAndSectionId', () => {
    it('should return an array of menu template section overrides by store ID and section ID', async () => {
      const mockMenuTemplateSectionOverrides = [
        new MenuTemplateSectionOverride(),
      ];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSectionOverrides);

      const result = await service.findAllByStoreIdAndSectionId(1, 1);
      expect(result).toEqual(mockMenuTemplateSectionOverrides);
    });
  });

  describe('remove', () => {
    it('should remove a menu template section override by ID', async () => {
      const mockMenuTemplateSectionOverride = new MenuTemplateSectionOverride();
      mockMenuTemplateSectionOverride.id = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockMenuTemplateSectionOverride);
      jest
        .spyOn(repository, 'remove')
        .mockResolvedValue({} as MenuTemplateSectionOverride);

      await service.remove(1);
      expect(repository.remove).toHaveBeenCalledWith(
        mockMenuTemplateSectionOverride,
      );
    });

    it('should throw NotFoundException if menu template section Override is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
