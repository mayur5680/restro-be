import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { Checkout } from './checkout.entity';
import { orderFactory } from '@modules/order/order.factory';
import { userFactory } from '@modules/user/user.factory';

export const checkoutFactory = Factory.Sync.makeFactory<Checkout>({
  id: Factory.Sync.each(() => faker.string.uuid()),
  orderId: Factory.Sync.each(() => faker.string.uuid()),
  customerId: Factory.Sync.each(() => faker.string.uuid()),
  user: Factory.Sync.each(() => userFactory.build()),
  payload: Factory.Sync.each(() => ({})),
  posOrderId: Factory.Sync.each(() => faker.number.int()),
  posOrderTimeStamp: Factory.Sync.each(() => faker.date.past()),
  status: Factory.Sync.each(() => {
    const statuses = ['COMPLETED', 'FAILED', 'INPROGRESS', 'PENDING'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }),
  createdAt: Factory.Sync.each(() => faker.date.recent()),
  createdBy: Factory.Sync.each(() => faker.number.int().toString()),
  updatedAt: Factory.Sync.each(() => faker.date.recent()),
  updatedBy: Factory.Sync.each(() => faker.number.int().toString()),
  deletedAt: Factory.Sync.each(() => faker.date.past()),
  addCutlery: Factory.Sync.each(() => faker.number.int()),
  kdsBumpTime: Factory.Sync.each(() => faker.date.past()),
  sourceIp: Factory.Sync.each(() => faker.internet.ip()),
  order: Factory.Sync.each(() => orderFactory.build()),
  payments: [],
});
