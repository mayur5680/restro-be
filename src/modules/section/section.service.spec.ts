import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

describe('SectionService', () => {
  let sectionService: SectionService;
  let sectionRepository: Repository<Section>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: getRepositoryToken(Section),
          useClass: Repository,
        },
      ],
    }).compile();

    sectionService = module.get<SectionService>(SectionService);
    sectionRepository = module.get<Repository<Section>>(
      getRepositoryToken(Section),
    );
  });

  it('should be defined', () => {
    expect(sectionService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sections', async () => {
      const sections: Section[] = [
        {
          /* mock section data */
        },
      ] as Section[];
      jest.spyOn(sectionRepository, 'find').mockResolvedValue(sections);

      const result = await sectionService.findAll();

      expect(result).toEqual(sections);
    });
  });

  describe('findOne', () => {
    it('should return a section by ID', async () => {
      const section: Section = {
        /* mock section data */
      } as Section;
      jest.spyOn(sectionRepository, 'findOne').mockResolvedValue(section);

      const result = await sectionService.findOne(1);

      expect(result).toEqual(section);
    });

    it('should throw NotFoundException if section with given ID is not found', async () => {
      jest.spyOn(sectionRepository, 'findOne').mockResolvedValue(null);

      await expect(sectionService.findOne(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new section', async () => {
      const createSectionDto: CreateSectionDto = {
        name: '',
        createdBy: 0,
      };
      const newSection: Section = { ...createSectionDto, id: 1 } as Section;

      jest.spyOn(sectionRepository, 'create').mockReturnValue(newSection);
      jest.spyOn(sectionRepository, 'save').mockResolvedValue(newSection);

      const result = await sectionService.create(createSectionDto);

      expect(result).toEqual(newSection);
    });
  });

  describe('update', () => {
    it('should update an existing section', async () => {
      const existingSection: Section = {
        /* mock section data */
      } as Section;
      const updateSectionDto: UpdateSectionDto = {
        name: '',
        updatedBy: 0,
      };
      const updatedSection: Section = {
        ...existingSection,
        ...updateSectionDto,
      } as Section;

      jest.spyOn(sectionService, 'findOne').mockResolvedValue(existingSection);
      jest.spyOn(sectionRepository, 'merge').mockReturnValue(updatedSection);
      jest.spyOn(sectionRepository, 'save').mockResolvedValue(updatedSection);

      const result = await sectionService.update(1, updateSectionDto);

      expect(result).toEqual(updatedSection);
    });
  });

  describe('remove', () => {
    it('should remove a section by ID', async () => {
      const existingSection: Section = {
        /* mock section data */
      } as Section;

      jest.spyOn(sectionService, 'findOne').mockResolvedValue(existingSection);
      jest.spyOn(sectionRepository, 'remove').mockResolvedValue(undefined);

      await sectionService.remove(1);

      expect(sectionRepository.remove).toHaveBeenCalledWith(existingSection);
    });
  });
});
