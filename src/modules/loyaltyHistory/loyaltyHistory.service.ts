import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { LoyaltyHistory } from './loyaltyHistory.entity';

@Injectable()
export class LoyaltyHistoryService {
  constructor(
    @InjectRepository(LoyaltyHistory)
    private readonly loyaltyHistoryRepository: Repository<LoyaltyHistory>,
  ) {}

  public async findAll(options?: FindManyOptions<LoyaltyHistory>) {
    return await this.loyaltyHistoryRepository.find(options);
  }

  public async findById(id: number): Promise<LoyaltyHistory | undefined> {
    return this.loyaltyHistoryRepository.findOne({ where: { id } });
  }

  public async findByUserId(userId: number): Promise<LoyaltyHistory[]> {
    return this.loyaltyHistoryRepository.find({ where: { userId } });
  }

  public async findByPosMemberId(
    posMemberId: number,
  ): Promise<LoyaltyHistory[]> {
    return this.loyaltyHistoryRepository.find({ where: { posMemberId } });
  }

  public async findByCardNumber(cardNumber: string): Promise<LoyaltyHistory[]> {
    return this.loyaltyHistoryRepository.find({ where: { cardNumber } });
  }
}
