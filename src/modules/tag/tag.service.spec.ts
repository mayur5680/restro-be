import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';

const mockTagRepository = {
  findAndCount: jest.fn(),
  findOne: jest.fn(),
};

describe('TagService', () => {
  let tagService: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    tagService = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(tagService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a tag by id', async () => {
      // Mock the repository response
      const mockTag = {
        id: 1,
        name: 'Liquor',
        description: 'Define if store sells Liquor',
        isActive: 1,
      };
      mockTagRepository.findOne.mockResolvedValueOnce(mockTag);

      // Call the service method
      const result = await tagService.findOne(1);

      // Assertions
      expect(result).toEqual(mockTag);
      expect(mockTagRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
