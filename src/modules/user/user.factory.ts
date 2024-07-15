import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { User } from './user.entity';

import { Identity } from './user.entity';

export const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.Sync.each(() => faker.number.int()),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  mobile: faker.phone.number(),
  password: faker.internet.password(),
  passwordScore: null,
  weakPassword: Factory.Sync.each(() => faker.datatype.boolean()),
  gender: Factory.Sync.each(() => faker.person.gender()),
  postcode: faker.location.zipCode(),
  countryCode: faker.location.countryCode(),
  dateofbirth: Factory.Sync.each(() => new Date()),
  isVerifiedEmail: Factory.Sync.each(() => faker.datatype.boolean()),
  isVerifiedMobile: Factory.Sync.each(() => faker.datatype.boolean()),
  receiveEmails: Factory.Sync.each(() => faker.datatype.boolean()),
  isActive: Factory.Sync.each(() => faker.datatype.boolean()),
  isTest: Factory.Sync.each(() => faker.datatype.boolean()),
  isMigrated: Factory.Sync.each(() => faker.datatype.boolean()),
  isMobileOwner: Factory.Sync.each(() => faker.datatype.boolean()),
  createdInBraintree: Factory.Sync.each(() => faker.datatype.boolean()),
  favouriteRestaurant: faker.company.name(),
  recentIdentity: Factory.Sync.each(() => {
    const identities = Object.values(Identity);
    return identities[Math.floor(Math.random() * identities.length)];
  }),
  isExistingAccount: Factory.Sync.each(() => faker.datatype.boolean()),
  loggedInAt: Factory.Sync.each(() => new Date()),
  isBlocked: Factory.Sync.each(() => faker.datatype.boolean()),
  blockedReason: null,
  createdAt: Factory.Sync.each(() => new Date()),
  createdBy: 1,
  updatedAt: Factory.Sync.each(() => new Date()),
  updatedBy: 1,
  deletedAt: null,
  dateUserCreated: Factory.Sync.each(() => new Date()),
  braintreeCustomerId: null,
  storeCard: Factory.Sync.each(() => faker.datatype.boolean()),
  loyalties: [],
  userIdentities: [],
  userExternalIdentities: [],
});
