import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365FaqService } from './resto365-faq.service';
import { FaqCategory, Resto365Faq } from './entities/resto365-faq.entity';
import { Repository } from 'typeorm';
import { CreateResto365FaqDto } from './dto/create-resto365-faq.dto';
import { UpdateResto365FaqDto } from './dto/update-resto365-faq.dto';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('Resto365FaqService', () => {
  let service: Resto365FaqService;
  let repository: Repository<Resto365Faq>;
  const mockRestoUser = new Resto365User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365FaqService,
        {
          provide: getRepositoryToken(Resto365Faq, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365FaqService>(Resto365FaqService);
    repository = module.get<Repository<Resto365Faq>>(
      getRepositoryToken(Resto365Faq, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of faqs', async () => {
      const faqs: Resto365Faq[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(faqs);

      expect(await service.findAll()).toBe(faqs);
    });

    it('should return an empty array if no faqs are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAll()).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('should return a single faq', async () => {
      const faqId = 1;
      const faq = new Resto365Faq();
      faq.id = faqId;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(faq);

      expect(await service.findOne(faqId)).toBe(faq);
    });

    it('should throw NotFoundException if faq is not found', async () => {
      const faqId = 999;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(faqId)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if an error occurs', async () => {
      const faqId = 1;
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.findOne(faqId)).rejects.toThrow(Error);
    });
  });

  describe('create', () => {
    it('should create a new faq', async () => {
      const createFaqDto: CreateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      const faq = new Resto365Faq();
      jest.spyOn(repository, 'create').mockReturnValueOnce(faq);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(faq);

      expect(
        await service.create(createFaqDto, mockRestoUser, {} as AuditParams),
      ).toBe(faq);
    });

    it('should throw an error if an error occurs', async () => {
      const createFaqDto: CreateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        service.create(createFaqDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });

    it('should throw an error if an error occurs while saving', async () => {
      const createFaqDto: CreateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      const faq = new Resto365Faq();
      jest.spyOn(repository, 'create').mockReturnValueOnce(faq);
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.create(createFaqDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });

    it('should throw an error if an error occurs while creating', async () => {
      const createFaqDto: CreateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        service.create(createFaqDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });
  });

  describe('update', () => {
    it('should update an existing faq', async () => {
      const faqId = 1;
      const updateFaqDto: UpdateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      const faq = new Resto365Faq();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(faq);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(faq);

      expect(
        await service.update(
          faqId,
          updateFaqDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toBe(faq);
    });

    it('should throw NotFoundException if faq is not found', async () => {
      const faqId = 999;
      const updateFaqDto: UpdateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.update(faqId, updateFaqDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if an error occurs', async () => {
      const faqId = 1;
      const updateFaqDto: UpdateResto365FaqDto = {
        title: 'How to create a new restaurant?',
        category: FaqCategory.Restaurants,
        documentUrl: 'https://example.com/document.pdf',
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(new Resto365Faq());
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.update(faqId, updateFaqDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });
  });

  describe('remove', () => {
    it('should remove an existing faq', async () => {
      const faqId = 1;
      const faq = new Resto365Faq();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(faq);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(undefined);

      expect(
        await service.remove(faqId, mockRestoUser, {} as AuditParams),
      ).toBeUndefined();
    });

    it('should throw NotFoundException if faq is not found', async () => {
      const faqId = 999;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.remove(faqId, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if an error occurs', async () => {
      const faqId = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(new Resto365Faq());
      jest.spyOn(repository, 'remove').mockRejectedValueOnce(new Error());

      await expect(
        service.remove(faqId, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });
  });

  describe('searchFaqByTitle', () => {
    it('should return an array of faqs', async () => {
      const title = 'How to create a new restaurant?';
      const faqs: Resto365Faq[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(faqs);

      expect(await service.searchFaqByTitle(title)).toBe(faqs);
    });

    it('should return an empty array if no faqs are found', async () => {
      const title = 'How to create a new restaurant?';
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchFaqByTitle(title)).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      const title = 'How to create a new restaurant?';
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.searchFaqByTitle(title)).rejects.toThrow(Error);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
