import { Expose } from 'class-transformer';

export class OrderByUserIdResponseDTO {
  @Expose()
  id: string;

  @Expose()
  checkoutId: string;

  @Expose()
  storeName: string;

  @Expose()
  createdAt: string;

  @Expose()
  status: string;

  @Expose()
  amountIncludingGst: number;

  @Expose()
  amountExcludingGst: number;

  @Expose()
  pickUpTime: string;

  @Expose()
  clientPlatformType: string;

  @Expose()
  clientVersion: string;

  @Expose()
  posOrderId: number;

  @Expose()
  posOrderTimestamp: string;

  @Expose()
  accruedPoints: number;

  @Expose()
  convertedDollars: number;

  @Expose()
  actualPointsBalance: number;

  @Expose()
  actualDollarsBalance: number;

  @Expose()
  collectionType: string;
}
