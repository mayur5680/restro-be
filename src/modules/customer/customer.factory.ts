import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import { Customer } from './customer.entity';

// todo(jhudiel) - after adding dto, remove toString in dates
export const customerFactory = Factory.Sync.makeFactory<Customer>({
  id: Factory.Sync.each(() => faker.string.uuid()),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  mobile: faker.phone.number(),
  gender: Factory.Sync.each(() => faker.person.gender()),
  postcode: faker.location.zipCode(),
  countryCode: faker.location.countryCode(),
  dateofbirth: Factory.Sync.each(() => faker.date.past().toString()),
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  createdAt: Factory.Sync.each(() => new Date().toString()),
  createdBy: Factory.Sync.each(() => faker.number.int()),
  updatedAt: Factory.Sync.each(() => new Date().toString()),
  updatedBy: Factory.Sync.each(() => faker.number.int()),
  deletedAt: null,
  dateUserCreated: Factory.Sync.each(() => new Date().toString()),
});
