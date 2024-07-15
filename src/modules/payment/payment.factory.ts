import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { Payment } from './payment.entity';

import { PaymentStatus, PaymentType } from './payment.entity';
import { checkoutFactory } from '@modules/checkout/checkout.factory';
import { userFactory } from '@modules/user/user.factory';
import { paymentSourceFactory } from '@modules/paymentSource/paymentSource.factory';
import { braintreeFactory } from '@modules/braintree/braintree.factory';

export const paymentFactory = Factory.Sync.makeFactory<Payment>({
  id: Factory.Sync.each(() => faker.string.uuid()),
  checkoutId: Factory.Sync.each(() => faker.string.uuid()),
  userId: Factory.Sync.each(() => faker.number.int()),
  paymentSourceId: Factory.Sync.each(() => faker.number.int()),
  type: Factory.Sync.each(() => {
    const types = Object.values(PaymentType);
    return types[Math.floor(Math.random() * types.length)];
  }),
  referenceId: Factory.Sync.each(() => faker.string.uuid()),
  status: Factory.Sync.each(() => {
    const statuses = Object.values(PaymentStatus);
    return statuses[Math.floor(Math.random() * statuses.length)];
  }),
  createdBy: Factory.Sync.each(() => faker.number.int()),
  createdAt: Factory.Sync.each(() => faker.date.recent()),
  updatedBy: Factory.Sync.each(() => faker.number.int()),
  updatedAt: Factory.Sync.each(() => faker.date.recent()),
  deletedAt: null,
  amount: Factory.Sync.each(() => faker.number.int({ min: 0 })),
  checkout: Factory.Sync.each(() => checkoutFactory.build()),
  user: Factory.Sync.each(() => userFactory.build()),
  paymentSource: Factory.Sync.each(() => paymentSourceFactory.build()),
  braintree: Factory.Sync.each(() => braintreeFactory.build()),
});
