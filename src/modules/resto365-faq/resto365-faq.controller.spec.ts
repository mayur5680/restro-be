import { Test, TestingModule } from '@nestjs/testing';
import { Resto365FaqController } from './resto365-faq.controller';
import { Resto365FaqService } from './resto365-faq.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResto365FaqDto } from './dto/create-resto365-faq.dto';
import { UpdateResto365FaqDto } from './dto/update-resto365-faq.dto';
import { FaqCategory, Resto365Faq } from './entities/resto365-faq.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

describe('Resto365FaqController', () => {
  let controller: Resto365FaqController;
  let service: Resto365FaqService;
  let repository: Repository<Resto365Faq>;

  const mockCreateResto365FaqDtoDto: CreateResto365FaqDto = {
    title: 'How to create a new restaurant?',
    category: FaqCategory.Restaurants,
    documentUrl: 'https://example.com/document.pdf',
  };

  const mockUpdateResto365FaqDtoDto: UpdateResto365FaqDto = {
    title: 'How to create a new restaurant?',
    category: FaqCategory.Restaurants,
    documentUrl: 'https://example.com/document.pdf',
  };

  const mockUser = {} as Resto365User;
  const mockCorrelationId = 'string-string-string-string-string';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365FaqController],
      providers: [
        Resto365FaqService,
        // Mock Resto365FaqRepository
        {
          provide: getRepositoryToken(Resto365Faq, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365FaqController>(Resto365FaqController);
    service = module.get<Resto365FaqService>(Resto365FaqService);
    repository = module.get<Repository<Resto365Faq>>(
      getRepositoryToken(Resto365Faq, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of faqs', async () => {
      jest
        .spyOn(repository, 'find')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.findAll({} as Resto365User, mockCorrelationId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if no FAQs are found', async () => {
      jest
        .spyOn(repository, 'find')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.findAll({} as Resto365User, mockCorrelationId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single faq', async () => {
      const faq = new Resto365Faq();
      faq.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(faq);

      expect(
        await controller.findOne('1', {} as Resto365User, mockCorrelationId),
      ).toBe(faq);
    });
  });

  describe('create', () => {
    it('should create a new faq', async () => {
      const faq = new Resto365Faq();
      faq.id = 1;
      jest.spyOn(service, 'create').mockResolvedValueOnce(faq);

      expect(
        await controller.create(
          mockCreateResto365FaqDtoDto,
          mockUser,
          mockCorrelationId,
        ),
      ).toEqual({
        data: faq,
        _metadata: {
          entitySource: 'Faq',
          entitySourceId: 1,
          description: 'FAQ created successfully',
        },
      });
    });

    it('should throw an InternalServerErrorException if faq creation fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(
        controller.create(
          mockCreateResto365FaqDtoDto,
          mockUser,
          mockCorrelationId,
        ),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update an existing faq', async () => {
      const faq = new Resto365Faq();
      faq.id = 1;
      jest.spyOn(service, 'update').mockResolvedValueOnce(faq);

      expect(
        await controller.update(
          '1',
          mockUpdateResto365FaqDtoDto,
          mockUser,
          mockCorrelationId,
        ),
      ).toEqual({
        data: faq,
        _metadata: {
          entitySource: 'Faq',
          entitySourceId: 1,
          description: 'FAQ updated successfully',
        },
      });
    });

    it('should throw a NotFoundException if faq to update is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.update(
          '1',
          mockUpdateResto365FaqDtoDto,
          mockUser,
          mockCorrelationId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an existing faq', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      expect(
        await controller.remove('1', {} as Resto365User, mockCorrelationId),
      ).toEqual({
        data: 'FAQ with ID 1 deleted successfully',
        _metadata: {
          entitySource: 'Faq',
          entitySourceId: 1,
          description: 'FAQ deleted successfully',
        },
      });
    });

    it('should throw an error if faq deletion fails', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      await expect(
        controller.remove('1', {} as Resto365User, mockCorrelationId),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
