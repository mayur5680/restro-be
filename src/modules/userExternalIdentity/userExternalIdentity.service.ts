import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserExternalIdentity } from './userExternalIdentity.entity';

@Injectable()
export class UserExternalIdentityService {
  constructor(
    @InjectRepository(UserExternalIdentity)
    private readonly userExternalIdentityRepository: Repository<UserExternalIdentity>,
  ) {}

  public async findById(id: number): Promise<UserExternalIdentity | undefined> {
    try {
      return await this.userExternalIdentityRepository.findOne({
        where: { id },
      } as FindOneOptions<UserExternalIdentity>);
    } catch (error) {
      // Handle or log the error
      throw new Error(
        `Failed to find user external identity by ID: ${error.message}`,
      );
    }
  }

  public async findByUserId(userId: number): Promise<UserExternalIdentity[]> {
    try {
      return await this.userExternalIdentityRepository.find({
        where: { userId },
      });
    } catch (error) {
      // Handle or log the error
      throw new Error(
        `Failed to find user external identities by user ID: ${error.message}`,
      );
    }
  }
}
