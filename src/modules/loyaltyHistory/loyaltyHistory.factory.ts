import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { LoyaltyHistory } from './loyaltyHistory.entity';
import {
  LoyaltyHistoryActionEnum,
  LoyaltyHistoryTypeEnum,
  LoyaltyHistoryStatusEnum,
  LoyaltyHistorySourceTypeEnum,
} from './loyaltyHistory.entity';

// todo(jhudiel) - remove `.toString` on dates on move to DTO transform
export const loyaltyHistoryFactory = Factory.Sync.makeFactory<LoyaltyHistory>({
  id: Factory.Sync.each(() => faker.number.int()),
  userId: null,
  posMemberId: faker.number.int(),
  cardNumber: faker.string.numeric(),
  storeId: faker.number.int(),
  totalValue: Factory.Sync.each(() => faker.number.int()),
  value: Factory.Sync.each(() => faker.number.int()),
  type: Factory.Sync.each(() => {
    const actions = Object.values(LoyaltyHistoryTypeEnum);
    return actions[Math.floor(Math.random() * actions.length)];
  }),
  action: Factory.Sync.each(() => {
    const actions = Object.values(LoyaltyHistoryActionEnum);
    return actions[Math.floor(Math.random() * actions.length)];
  }),
  status: Factory.Sync.each(() => {
    const actions = Object.values(LoyaltyHistoryStatusEnum);
    return actions[Math.floor(Math.random() * actions.length)];
  }),
  syncBraze: false,
  sourceId: Factory.Sync.each(() => faker.string.uuid()),
  requestIdentifier: Factory.Sync.each(() => faker.string.uuid()),
  comments: null,
  sourceType: Factory.Sync.each(() => {
    const actions = Object.values(LoyaltyHistorySourceTypeEnum);
    return actions[Math.floor(Math.random() * actions.length)];
  }),
  createdAt: Factory.Sync.each(() => new Date().toString()),
  createdBy: '1',
  updatedAt: Factory.Sync.each(() => new Date().toString()),
  updatedBy: '1',
  deletedAt: null,
});
