import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import { PaymentSource } from './paymentSource.entity';

export const paymentSourceFactory = Factory.Sync.makeFactory<PaymentSource>({
  id: Factory.Sync.each(() => faker.number.int()),
  name: Factory.Sync.each(() => {
    const names = ['BRAINTREE', 'GYGDOLLAR', 'COUPON', 'GIFTCARD', 'CASH'];
    return names[Math.floor(Math.random() * names.length)];
  }),
  isActive: Factory.Sync.each(() => faker.number.int()),
  createdAt: Factory.Sync.each(() => faker.date.recent()),
  createdBy: Factory.Sync.each(() => faker.number.int().toString()),
  updatedAt: Factory.Sync.each(() => faker.date.recent()),
  updatedBy: Factory.Sync.each(() => faker.number.int().toString()),
  deletedAt: Factory.Sync.each(() => faker.date.recent()),
  posMediaId: Factory.Sync.each(() => faker.number.int()),
  posMediaDescription: Factory.Sync.each(() => faker.lorem.sentence()),
});
