import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan } from 'typeorm';

import { UserIdentity } from './userIdentity.entity';
import moment from 'moment';

@Injectable()
export class UserIdentityService {
  constructor(
    @InjectRepository(UserIdentity)
    private readonly userIdentityRepository: Repository<UserIdentity>,
  ) {}

  public async findById(id: number): Promise<UserIdentity> {
    try {
      return await this.userIdentityRepository.findOneOrFail({
        where: { id },
        relations: ['user'], // Add any relations you want to include
      });
    } catch (error) {
      throw new NotFoundException(`UserIdentity not found`);
    }
  }

  public async findByUserId(userId: number): Promise<UserIdentity[]> {
    return this.userIdentityRepository.find({ where: { userId } });
  }

  public async findAll(options?: FindOneOptions<UserIdentity>) {
    return await this.userIdentityRepository.find(options);
  }

  public async groupByIdentityProvider() {
    // Calculate the date 30 days ago using moment.js
    const thirtyDaysAgo = moment().subtract(30, 'days').toDate();

    // Query the user identities created in the last 30 days
    const identities = await this.userIdentityRepository.find({
      where: {
        createdAt: MoreThan(thirtyDaysAgo), // Filter records created after thirtyDaysAgo
      },
    });

    // Group the identities by identity provider
    const groupedIdentities = {};

    for (const identity of identities) {
      const identityProvider = identity.identityProvider;

      if (!groupedIdentities[identityProvider]) {
        groupedIdentities[identityProvider] = 1;
      } else {
        groupedIdentities[identityProvider]++;
      }
    }

    return groupedIdentities;
  }
}
