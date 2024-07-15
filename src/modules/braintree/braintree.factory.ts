import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import { Braintree, PaymentTypeEnum } from './braintree.entity';

const status = ['Settled', 'submitted_for_settlement'];

// todo(jhudiel) - after adding dto, remove toString in dates
export const braintreeFactory = Factory.Sync.makeFactory<Braintree>({
  id: Factory.Sync.each(() => faker.string.uuid()),
  paymentId: Factory.Sync.each(() => faker.string.uuid()),
  amount: Factory.Sync.each(() =>
    parseFloat(faker.finance.amount(0, 10000, 2)),
  ),
  transactionStatus: Factory.Sync.each(() => {
    return status[Math.floor(Math.random() * status.length)];
  }),
  transactionId: Factory.Sync.each(() => faker.string.uuid()),
  nounce: faker.string.sample(255),
  BTAFT: Factory.Sync.each(() => JSON.stringify({})),
  createdAt: Factory.Sync.each(() => faker.date.past().toString()),
  createdBy: faker.internet.userName(),
  updatedAt: Factory.Sync.each(() => faker.date.recent().toString()),
  updatedBy: faker.internet.userName(),
  deletedAt: Factory.Sync.each(() => faker.date.past().toString()),
  paymentType: Factory.Sync.each(() => {
    const types = Object.values(PaymentTypeEnum);
    return types[Math.floor(Math.random() * types.length)];
  }),
  payment: null,
});
