import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  type Repository,
  type FindManyOptions,
  Like,
  IsNull,
  Not,
} from 'typeorm';
import { Loyalty } from '@modules/loyalty/loyalty.entity';

import { UserBlockDTO, UserUpdateDTO } from './user.dto';
import { User } from './user.entity';
import { getCurrentTimestampInMilliseconds, isEmail, isNumeric } from './utils';
import { UserIdentity } from '@modules/userIdentity/userIdentity.entity';
import { DeletedAccountsStats } from './interfaces/deleted-accounts-stats.interface';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Loyalty)
    private readonly loyaltyRepository: Repository<Loyalty>,
  ) {}

  public async findAll(options?: FindManyOptions<User>) {
    return await this.userRepository.find(options);
  }

  public async findById(id: number) {
    return (await this.createQueryBuilder())
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.email = :email', { email })
      .getMany();
  }

  async findByMobile(mobile: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.mobile = :mobile', { mobile })
      .getMany();
  }

  async findByUsername(username: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.username = :username', { username })
      .getMany();
  }

  async findByFullName(firstName: string, lastName: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }

  async findByFirstName(firstName: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.firstName = :firstName', { firstName })
      .getMany();
  }

  async findByLastName(lastName: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('user.lastName = :lastName', { lastName })
      .getMany();
  }

  async findByCardNumber(cardNumber: string): Promise<User[]> {
    return (await this.createQueryBuilder())
      .where('loyalty.cardNumber = :cardNumber', { cardNumber })
      .getMany();
  }

  private async createQueryBuilder() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.loyalties',
        'loyalty',
        'loyalty.deletedAt IS NULL',
      )
      .innerJoinAndSelect(
        'user.userExternalIdentities',
        'ue',
        'ue.userId = user.id',
      );
  }

  async search(query: string): Promise<User[]> {
    if (!query) {
      throw new BadRequestException('Search query must not be empty.');
    }

    if (isNumeric(query)) {
      // Search by ID or mobile if query is numeric
      const userById = await this.findById(parseInt(query));
      if (userById) {
        return [userById];
      } else {
        const usersByMobile = await this.findByMobile('+' + query);
        if (isEmpty(usersByMobile)) {
          const usersByCardNumber = await this.findByCardNumber(query);
          return usersByCardNumber;
        }
        return usersByMobile;
      }
    } else if (isEmail(query)) {
      // Search by email
      return await this.findByEmail(query);
    } else if (query.includes(' ')) {
      // Search by full name if query contains space
      const [firstName, lastName] = query.split(' ');
      return await this.findByFullName(firstName, lastName);
    } else {
      // Search by first name, last name, or username
      const usersByFirstName = await this.findByFirstName(query);
      if (isEmpty(usersByFirstName)) {
        const usersByLastName = await this.findByLastName(query);
        if (usersByLastName) {
          return usersByLastName;
        }
        const loyalties = await this.loyaltyRepository.find({
          relations: ['user'],
          where: [
            { cardNumber: Like(`%${query}%`) },
            { posMemberId: query as unknown as number },
            { user: Not(IsNull()) },
          ],
        });
        return loyalties
          .filter((loyalty) => loyalty.user)
          .map((loyalty) => loyalty.user);
      } else {
        return usersByFirstName;
      }
    }
  }

  public async updateUser(id: number, updateUserDto: UserUpdateDTO) {
    const { loyalty, ...dto } = updateUserDto;

    const userResult = await this.userRepository.update({ id }, dto);
    if (userResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    if (loyalty) {
      const { id: loyaltyId, ...loyaltyDto } = loyalty;
      const loyaltyResult = await this.loyaltyRepository.update(
        { id: loyaltyId },
        loyaltyDto,
      );
      if (loyaltyResult.affected === 0) {
        throw new NotFoundException(`Loyalty with ID ${id} not found.`);
      }
    }

    return this.findById(id);
  }

  public async blockUser(id: number, userBlockDto: UserBlockDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    if (user.isBlocked) {
      throw new BadRequestException(`User with ID ${id} is already blocked`);
    }

    user.isActive = false;
    user.isBlocked = true;
    user.blockedReason = userBlockDto.blockReason;
    await this.userRepository.save(user);

    return this.findById(id);
  }

  public async unblockUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (isEmpty(user)) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    if (!user.isBlocked) {
      throw new BadRequestException(`User with ID ${id} is already unblocked`);
    }

    user.isActive = true;
    user.isBlocked = false;
    user.blockedReason = null;
    await this.userRepository.save(user);

    return this.findById(id);
  }

  public async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const currentTimeStamp = new Date();

    const timestamp = getCurrentTimestampInMilliseconds();
    user.username = `${timestamp}_${user.username}`;
    user.firstName = `${timestamp}_${user.firstName}`;
    user.lastName = `${timestamp}_${user.lastName}`;
    user.email = `${timestamp}_${user.email}`;
    user.mobile = `${timestamp}_${user.mobile}`;
    user.isActive = false;
    user.updatedAt = currentTimeStamp;
    user.updatedBy = 2;
    user.deletedAt = currentTimeStamp;

    await this.userRepository.save(user);

    return this.findById(id);
  }

  async getRegistrationStatsLast30Days() {
    const results = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'COUNT(*) as totalRegistration',
        "DATE_FORMAT(u.createdAt, '%Y-%m-%d') AS dateRegistered",
      ])
      .innerJoin(UserIdentity, 'ui', 'u.id = ui.userId')
      .where('u.createdAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()')
      .groupBy("DATE_FORMAT(u.createdAt, '%Y-%M-%d')")
      .orderBy('u.createdAt', 'ASC')
      .getRawMany();

    return results;
  }

  async getDeletedAcountsStatsLast30Days(): Promise<DeletedAccountsStats[]> {
    const results = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'COUNT(*) as totalDeleted',
        "DATE_FORMAT(u.updatedAt, '%Y-%m-%d') AS dayDeleted",
      ])
      .where('u.createdAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()')
      .andWhere('u.mobile LIKE "%_+%"')
      .groupBy("DATE_FORMAT(u.updatedAt, '%Y-%M-%d')")
      .orderBy('u.updatedAt', 'ASC')
      .getRawMany();

    return results;
  }
}
