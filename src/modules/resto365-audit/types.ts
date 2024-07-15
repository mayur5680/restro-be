import { EntitySource } from './entities/resto365-audit.entity';

export type AuditableResponse<T> = {
  data: T;
  _metadata: {
    entitySource?: EntitySource;
    entitySourceId?: number;
    description?: string;
  };
};

export type AuditModule =
  | 'Restaurant'
  | 'Restaurant/Licence'
  | 'Faq'
  | 'Restaurant/Equipment'
  | 'Restaurant/Profile'
  | 'Restaurant/Operations'
  | 'Restaurant/StoreServiceAvailabilities'
  | 'Restaurant/ITInformation'
  | 'Restaurant/Sustainability'
  | 'Restaurant/Menu'
  | 'User Management/Role'
  | 'User Management/User'
  | 'Restaurant/PermanentTradingHours'
  | 'Restaurant/TemporaryTradingHours'
  | 'Restaurant/PermanentOrderOffset'
  | 'Restaurant/TemporaryOrderOffset'
  | 'GuestExperience/Loyalty';
