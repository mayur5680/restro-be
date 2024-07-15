import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';

describe('SectionController', () => {
  let controller: SectionController;
  let sectionService: SectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        {
          provide: SectionService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SectionController>(SectionController);
    sectionService = module.get<SectionService>(SectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sections', async () => {
      const sections: Section[] = [
        {
          /* mock section data */
        },
      ] as Section[];
      jest.spyOn(sectionService, 'findAll').mockResolvedValue(sections);

      const result = await controller.findAll();

      expect(result).toEqual(sections);
    });
  });

  describe('findOne', () => {
    it('should return a section by ID', async () => {
      const section: Section = {
        /* mock section data */
      } as Section;
      jest.spyOn(sectionService, 'findOne').mockResolvedValue(section);

      const result = await controller.findOne('1');

      expect(result).toEqual(section);
    });
  });

  describe('create', () => {
    it('should create a section', async () => {
      const section: Section = {
        /* mock section data */
      } as Section;
      jest.spyOn(sectionService, 'create').mockResolvedValue(section);

      const result = await controller.create(section);

      expect(result).toEqual(section);
    });
  });

  describe('update', () => {
    it('should update a section', async () => {
      const section: Section = {
        /* mock section data */
      } as Section;
      jest.spyOn(sectionService, 'update').mockResolvedValue(section);

      const result = await controller.update('1', section);

      expect(result).toEqual(section);
    });
  });

  describe('remove', () => {
    it('should remove a section', async () => {
      jest.spyOn(sectionService, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(result).toEqual(undefined);
    });
  });
});
