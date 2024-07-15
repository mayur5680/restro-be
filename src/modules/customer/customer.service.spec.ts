import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { customerFactory } from './customer.factory';

describe('CustomerService', () => {
  let sut: CustomerService;
  let repository: Repository<Customer>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    sut = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const mockCustomers = customerFactory.buildList(2);
      mockRepository.find.mockResolvedValue(mockCustomers);

      expect(await sut.findAll()).toEqual(mockCustomers);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should throw an error if there is a problem fetching customers', async () => {
      mockRepository.find.mockRejectedValue(new Error('Error'));

      try {
        await sut.findAll();
      } catch (e) {
        expect(e.message).toBe('Unable to fetch list of customers');
      }
    });
  });

  describe('findById', () => {
    it('should return a customer by id', async () => {
      const mockCustomer = customerFactory.build();
      mockRepository.findOne.mockResolvedValue(mockCustomer);

      expect(await sut.findById(mockCustomer.id)).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockCustomer.id,
        },
      });
    });

    it('should throw a NotFoundException if customer is not found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      const randomId = customerFactory.build().id;
      await expect(sut.findById(randomId)).rejects.toThrow(
        new NotFoundException('Customer not found').message,
      );
    });

    it('should throw an error if there is a problem fetching the customer', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('Error'));
      const randomId = customerFactory.build().id;
      try {
        await sut.findById(randomId);
      } catch (e) {
        expect(e.message).toBe(
          `Unable to retrieve customer with id: ${randomId}`,
        );
      }
    });
  });
});
