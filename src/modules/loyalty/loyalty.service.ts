import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loyalty } from './loyalty.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(Loyalty)
    private readonly loyaltyRepository: Repository<Loyalty>,
  ) {}

  public getLoyaltyByUserId(userId: number | string) {
    return this.loyaltyRepository.findOne({
      where: {
        userId: userId as number,
      },
    });
  }
}
