import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BraintreeService } from './braintree.service';
import { Braintree } from './braintree.entity';
import { braintreeFactory } from './braintree.factory';

describe('BraintreeService', () => {
  let sut: BraintreeService;
  let repository: Repository<Braintree>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BraintreeService,
        {
          provide: getRepositoryToken(Braintree),
          useValue: mockRepository,
        },
      ],
    }).compile();

    sut = module.get<BraintreeService>(BraintreeService);
    repository = module.get<Repository<Braintree>>(
      getRepositoryToken(Braintree),
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of braintree entries', async () => {
      const mockBraintreeEntries = braintreeFactory.buildList(2);
      mockRepository.find.mockResolvedValue(mockBraintreeEntries);

      expect(await sut.findAll()).toEqual(mockBraintreeEntries);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should throw an error if there is a problem fetching braintree entries', async () => {
      mockRepository.find.mockRejectedValue(new Error('Error'));

      try {
        await sut.findAll();
      } catch (e) {
        expect(e.message).toBe('Unable to fetch list of braintree');
      }
    });
  });

  describe('findById', () => {
    it('should return a braintree by id', async () => {
      const mockBraintree = braintreeFactory.build();
      mockRepository.findOne.mockResolvedValue(mockBraintree);

      expect(await sut.findById(mockBraintree.id)).toEqual(mockBraintree);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockBraintree.id,
        },
      });
    });

    it('should throw a NotFoundException if braintree is not found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      const randomId = braintreeFactory.build().id;
      await expect(sut.findById(randomId)).rejects.toThrow(
        new NotFoundException('Braintree entry not found').message,
      );
    });

    it('should throw an error if there is a problem fetching the braintree', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('Error'));
      const randomId = braintreeFactory.build().id;
      try {
        await sut.findById(randomId);
      } catch (e) {
        expect(e.message).toBe(
          `Unable to retrieve braintree with id: ${randomId}`,
        );
      }
    });
  });
});
