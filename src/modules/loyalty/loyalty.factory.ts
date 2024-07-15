import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { Loyalty } from './loyalty.entity';

export const loyaltyFactory = Factory.Sync.makeFactory<Loyalty>({
  id: Factory.Sync.each(() => faker.number.int().toString()),
  userId: null,
  posMemberId: faker.number.int(),
  cardNumber: faker.string.numeric(),
  points: faker.number.int(),
  gygDollar: faker.number.float(),
  issueDate: Factory.Sync.each(() => new Date()),
  expiryDate: Factory.Sync.each(() => new Date()),
  isActive: Factory.Sync.each(() => faker.datatype.boolean()),
  posMemberId2112: faker.number.int(),
  createdAt: Factory.Sync.each(() => new Date()),
  createdBy: '1',
  updatedAt: Factory.Sync.each(() => new Date()),
  updatedBy: '1',
  deletedAt: null,
  user: null,
});
