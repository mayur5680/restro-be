import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserIdentity } from '@modules/userIdentity/userIdentity.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { Loyalty } from '@modules/loyalty/loyalty.entity';
import { UserService } from './user.service';

import { User } from './user.entity';
import { userFactory } from './user.factory';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Loyalty),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserIdentity),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    const mockUsers = userFactory.buildList(2);

    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const users = await userService.findAll();
      expect(users).toBe(mockUsers);
    });

    it('should call the find method from the userRepository', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      await userService.findAll();
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user for a valid ID', async () => {
      const mockUser = userFactory.build();

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const user = await userService.findById(1);
      expect(user).toEqual(mockUser);
      expect(queryBuilder.where).toHaveBeenCalledWith('user.id = :id', {
        id: 1,
      });
    });

    it('should return null for an invalid ID', async () => {
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const user = await userService.findById(999);
      expect(user).toBeNull();
      expect(queryBuilder.where).toHaveBeenCalledWith('user.id = :id', {
        id: 999,
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user for a valid email', async () => {
      const mockUser = userFactory.build();
      const mockEmail = 'test@test.com';

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUser]),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const users = await userService.findByEmail(mockEmail);
      expect(users).toEqual([mockUser]);
      expect(queryBuilder.where).toHaveBeenCalledWith('user.email = :email', {
        email: mockEmail,
      });
    });
  });

  describe('findByMobile', () => {
    it('should return a user for a valid mobile number', async () => {
      const mockUser = userFactory.build();
      const mockMobile = '1234567890';

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUser]),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const users = await userService.findByMobile(mockMobile);
      expect(users).toEqual([mockUser]);
      expect(queryBuilder.where).toHaveBeenCalledWith('user.mobile = :mobile', {
        mobile: mockMobile,
      });
    });
  });

  describe('findByUsername', () => {
    it('should return a user for a valid username', async () => {
      const mockUser = userFactory.build();
      const mockUsername = 'testuser';

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUser]),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const users = await userService.findByUsername(mockUsername);
      expect(users).toEqual([mockUser]);
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'user.username = :username',
        {
          username: mockUsername,
        },
      );
    });
  });

  describe('search', () => {
    it('should throw BadRequestException if the search query is empty', async () => {
      await expect(userService.search('')).rejects.toThrow(BadRequestException);
    });

    it('should search by ID or Mobile or CardNumber if the query isNumeric', async () => {
      const mockUser = userFactory.build();
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser);

      const result = await userService.search('123');
      expect(result).toEqual([mockUser]);
      expect(userService.findById).toHaveBeenCalledWith(123);
    });

    it('should search by email if the query is isEmail', async () => {
      const mockUser = userFactory.build();
      jest.spyOn(userService, 'findByEmail').mockResolvedValue([mockUser]);

      const result = await userService.search('test@example.com');
      expect(result).toEqual([mockUser]);
      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should search by full name if the query contains a space', async () => {
      const mockUser = userFactory.build();
      jest.spyOn(userService, 'findByFullName').mockResolvedValue([mockUser]);

      const result = await userService.search('John Doe');
      expect(result).toEqual([mockUser]);
      expect(userService.findByFullName).toHaveBeenCalledWith('John', 'Doe');
    });
  });

  describe('blockUser', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = userFactory.build();
    });

    it('should successfully block an unblocked user', async () => {
      mockUser.isBlocked = false;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...mockUser,
        isBlocked: true,
        blockedReason: 'Violation of terms',
      });
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const blockedUser = await userService.blockUser(mockUser.id, {
        blockReason: 'Violation of terms',
      });

      expect(blockedUser.isBlocked).toBeTruthy();
      expect(blockedUser.blockedReason).toBe('Violation of terms');
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        isBlocked: true,
        blockedReason: 'Violation of terms',
      });
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        userService.blockUser(999, { blockReason: 'Violation of terms' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if the user is already blocked', async () => {
      mockUser.isBlocked = true;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      await expect(
        userService.blockUser(mockUser.id, {
          blockReason: 'Violation of terms',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('unblockUser', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = userFactory.build();
    });

    it('should successfully unblocked an blocked user', async () => {
      mockUser.isBlocked = true;
      mockUser.isActive = false;
      mockUser.blockedReason = 'Testing';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...mockUser,
        isBlocked: false,
        isActive: true,
        blockedReason: null,
      });
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const unblockedUser = await userService.unblockUser(mockUser.id);

      expect(unblockedUser.isBlocked).not.toBeTruthy();
      expect(unblockedUser.blockedReason).toBeNull();
      expect(unblockedUser.isActive).toBeTruthy();
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        isBlocked: false,
        isActive: true,
        blockedReason: null,
      });
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.unblockUser(999)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if the user is already unblocked', async () => {
      mockUser.isBlocked = false;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      await expect(userService.unblockUser(mockUser.id)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('deletekUser', () => {
    let mockUser;
    const unixTimestamp = 1637000000000;

    beforeEach(() => {
      mockUser = userFactory.build();
    });

    it('should successfully delete a user account', async () => {
      mockUser.deletedAt = null as unknown as Date | null | undefined;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...mockUser,
        userName: `${unixTimestamp}_${mockUser.username}`,
        firstName: `${unixTimestamp}_${mockUser.firstName}`,
        lastName: `${unixTimestamp}_${mockUser.lastName}`,
        email: `${unixTimestamp}_${mockUser.email}`,
        mobile: `${unixTimestamp}_${mockUser.mobile}`,
        updatedAt: new Date(),
        updatedBy: 2,
        deletedAt: new Date(),
      });
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as never);

      const deletedUser = await userService.deleteUser(mockUser.id);

      expect(deletedUser).toBeDefined();
      expect(deletedUser.deletedAt).toBeDefined();
      expect(deletedUser.username).toContain('_');
      expect(deletedUser.firstName).toContain('_');
      expect(deletedUser.lastName).toContain('_');
      expect(deletedUser.email).toContain('_');
      expect(deletedUser.mobile).toContain('_');
      expect(deletedUser.isActive).toBeFalsy();
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      });
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.deleteUser(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getRegistrationStatsLast30Days', () => {
    it('should return registration stats for the last 30 days', async () => {
      // Mock the data you expect to be returned by the repository
      const mockRegistrationStats = [
        {
          totalRegistration: 3,
          dateRegistered: '2023-11-15',
        },
        {
          totalRegistration: 5,
          dateRegistered: '2023-11-16',
        },
      ];

      // Mock the query builder
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockRegistrationStats),
      };

      // Mock the behavior of the repository
      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(mockQueryBuilder as any);

      // Call the method being tested
      const registrationStats =
        await userService.getRegistrationStatsLast30Days();

      // Assert that the method returns the expected data
      expect(registrationStats).toEqual(mockRegistrationStats);
      // Add additional assertions if needed
      expect(userRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'COUNT(*) as totalRegistration',
        "DATE_FORMAT(u.createdAt, '%Y-%m-%d') AS dateRegistered",
      ]);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'u.createdAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()',
      );
      expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith(
        "DATE_FORMAT(u.createdAt, '%Y-%M-%d')",
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'u.createdAt',
        'ASC',
      );
      expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
    });
  });

  describe('getDeletedAcountsStatsLast30Days', () => {
    it('should return deleted accounts stats for the last 30 days', async () => {
      const mockDeletedAccountsStats = [
        {
          totalDeleted: 3,
          dayDeleted: '2023-11-15',
        },
        {
          totalDeleted: 5,
          dayDeleted: '2023-11-16',
        },
      ];

      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockDeletedAccountsStats),
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(mockQueryBuilder as any);

      const deletedAccountsStats =
        await userService.getDeletedAcountsStatsLast30Days();

      expect(deletedAccountsStats).toEqual(mockDeletedAccountsStats);
      expect(userRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'COUNT(*) as totalDeleted',
        "DATE_FORMAT(u.updatedAt, '%Y-%m-%d') AS dayDeleted",
      ]);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'u.createdAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()',
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'u.mobile LIKE "%_+%"',
      );
      expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith(
        "DATE_FORMAT(u.updatedAt, '%Y-%M-%d')",
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'u.updatedAt',
        'ASC',
      );
      expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
    });
  });
});
