import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import { Order } from './order.entity';

export const orderFactory = Factory.Sync.makeFactory<Order>({
  id: Factory.Sync.each(() => faker.string.uuid()),
  status: Factory.Sync.each(() => {
    const statuses = [
      'ABANDONED',
      'AWAITING_PICKUP',
      'CREATED',
      'FAILED',
      'INPROGRESS',
      'COMPLETED',
      'CANCELLED',
      'RECEIVED',
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }),
  type: Factory.Sync.each(() => faker.number.int()),
  tableNumber: Factory.Sync.each(() => faker.number.int()),
  // You need to handle relations like store, channel, etc. appropriately
  channelId: Factory.Sync.each(() => faker.number.int()),
  createdAt: Factory.Sync.each(() => faker.date.recent()),
  createdBy: Factory.Sync.each(() => faker.number.int().toString()),
  updatedAt: Factory.Sync.each(() => faker.date.recent()),
  updatedBy: Factory.Sync.each(() => faker.number.int()),
  deletedAt: Factory.Sync.each(() => faker.date.recent()),
  collectionType: Factory.Sync.each(() => {
    const types = [
      'CATERING',
      'DELIVERY',
      'DRIVETHRU',
      'EATIN',
      'PICKUP',
      'TABLE',
      'TAKEAWAY',
    ];
    return types[Math.floor(Math.random() * types.length)];
  }),
  orderStage: Factory.Sync.each(() => faker.number.int()),
  items: Factory.Sync.each(() => JSON.stringify({})),
  isCheckedOut: Factory.Sync.each(() => faker.datatype.boolean()),
  paymentToken: Factory.Sync.each(() => faker.finance.creditCardNumber()),
  paymentTokenTimestamp: Factory.Sync.each(() => faker.date.recent()),
  productType: Factory.Sync.each(() => {
    const types = ['MULTIPART', 'SINGLEPART'];
    return types[Math.floor(Math.random() * types.length)];
  }),
  amountIncludingGst: Factory.Sync.each(() =>
    parseFloat(faker.commerce.price()),
  ),
  amountExcludingGst: Factory.Sync.each(() =>
    parseFloat(faker.commerce.price()),
  ),
  gstAmount: Factory.Sync.each(() => parseFloat(faker.commerce.price())),
  itemsResponse: Factory.Sync.each(() => JSON.stringify({})),
  offers: Factory.Sync.each(() => JSON.stringify({})),
  offerTrail: Factory.Sync.each(() => JSON.stringify({})),
  pickUpTime: Factory.Sync.each(() => faker.date.future()),
  activeUntil: Factory.Sync.each(() => faker.date.future()),
  posMenuId: Factory.Sync.each(() => faker.number.int()),
  parentOrderId: Factory.Sync.each(() => faker.string.uuid()),
  orderNumber: Factory.Sync.each(() => faker.number.int()),
  hash: Factory.Sync.each(() => faker.string.uuid()),
  orderRatingScheduleId: Factory.Sync.each(() => faker.string.uuid()),
  supportTicketId: Factory.Sync.each(() => faker.number.int()),
  clientPlatformType: Factory.Sync.each(() => {
    const types = ['iOS', 'Android', 'Web'];
    return types[Math.floor(Math.random() * types.length)];
  }),
  clientVersion: Factory.Sync.each(() => faker.system.semver()),
  checkout: null,
  store: null,
});
