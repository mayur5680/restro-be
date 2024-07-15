import { Expose, Type, Transform, plainToInstance } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsEmail,
} from 'class-validator';

import { LoyaltyDetailDTO } from '@modules/loyalty/loyalty.dto';
import { UserExternalIdentityDetailDTO } from '@modules/userExternalIdentity/userExternalIdentity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserSearchResponseDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  mobile: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @ApiProperty()
  isBlocked: boolean;

  @Expose()
  @ApiProperty()
  blockedReason: string;
}

export class UserDetailResponseDTO {
  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @ApiProperty()
  isBlocked: boolean;

  @Expose()
  @ApiProperty()
  isVerifiedEmail: boolean;

  @Expose()
  @ApiProperty()
  mobile: string;

  @Expose()
  @ApiProperty()
  braintreeCustomerId: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  dateofbirth: string | Date;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  createdAt: string | Date;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  updatedAt: string | Date;

  @Expose()
  @ApiProperty()
  @Type(() => LoyaltyDetailDTO)
  @Transform(({ obj, options }) => {
    const loyalty =
      obj.loyalties && obj.loyalties.length > 0 ? obj.loyalties[0] : null;
    return loyalty
      ? plainToInstance(LoyaltyDetailDTO, loyalty, {
          ...options,
          excludeExtraneousValues: true,
        })
      : null;
  })
  loyalty: LoyaltyDetailDTO;

  @Expose()
  @ApiProperty()
  @Type(() => UserExternalIdentityDetailDTO)
  @Transform(({ obj, options }) => {
    const userExternalIdentity =
      obj.userExternalIdentities && obj.userExternalIdentities.length > 0
        ? obj.userExternalIdentities[0]
        : null;
    return userExternalIdentity
      ? plainToInstance(UserExternalIdentityDetailDTO, userExternalIdentity, {
          ...options,
          excludeExtraneousValues: true,
        })
      : null;
  })
  userExternalIdentity: UserExternalIdentityDetailDTO;
}

class UserLoyaltyUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardNumber: string;
}

export class UserUpdateDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  dateOfBirth?: Date | null;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => UserLoyaltyUpdateDTO)
  loyalty: UserLoyaltyUpdateDTO;
}

export class UserBlockDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  blockReason: string;
}
