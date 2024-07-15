import { Expose } from 'class-transformer';

export class UserExternalIdentityDetailDTO {
  @Expose()
  brazeId: string;

  @Expose()
  branchDeepLink: string;

  @Expose()
  branchId: string;
}
