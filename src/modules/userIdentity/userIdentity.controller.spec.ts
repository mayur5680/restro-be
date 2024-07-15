import { Test, TestingModule } from '@nestjs/testing';
import { UserIdentityController } from './userIdentity.controller';
import { UserIdentityService } from './userIdentity.service';
import { UserIdentity } from './userIdentity.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';

describe('UserIdentityController', () => {
  let userIdentityController: UserIdentityController;
  let userIdentityService: UserIdentityService;

  // Mock data
  const mockUserIdentityArray: UserIdentity[] = [
    {
      id: 1,
      userId: 16,
      identityUsername: 'test',
      isEnabled: true,
      identityProvider: 'Password',
      isEmailVerified: true,
      isPhoneVerified: true,
      accountStatus: 'test',
      lastKnownIp: 'test',
      lastLoginDate: new Date(),
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      user: new User(),
    },
    {
      id: 2,
      userId: 16,
      identityUsername: 'test2',
      isEnabled: false,
      identityProvider: 'Facebook',
      isEmailVerified: true,
      isPhoneVerified: false,
      accountStatus: 'test2',
      lastKnownIp: 'test2',
      lastLoginDate: new Date(),
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      user: new User(),
    },
    {
      id: 3,
      userId: 16,
      identityUsername: 'test3',
      isEnabled: false,
      identityProvider: 'Google',
      isEmailVerified: true,
      isPhoneVerified: false,
      accountStatus: 'test3',
      lastKnownIp: 'test3',
      lastLoginDate: new Date(),
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      user: new User(),
    },
    {
      id: 4,
      userId: 16,
      identityUsername: 'test4',
      isEnabled: false,
      identityProvider: 'Apple',
      isEmailVerified: true,
      isPhoneVerified: false,
      accountStatus: 'test4',
      lastKnownIp: 'test4',
      lastLoginDate: new Date(),
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      user: new User(),
    },
  ];

  const expectedGroupedData = {
    Password: 1,
    Facebook: 1,
    Google: 1,
    Apple: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIdentityController],
      providers: [
        {
          provide: UserIdentityService,
          useValue: {
            findAll: jest.fn(),
            findByUserId: jest.fn(),
            findById: jest.fn(),
            groupByIdentityProvider: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserIdentity),
          useClass: Repository,
        },
      ],
    }).compile();

    userIdentityController = module.get<UserIdentityController>(
      UserIdentityController,
    );
    userIdentityService = module.get<UserIdentityService>(UserIdentityService);
  });

  describe('findAll', () => {
    it('should return all userIdentities when no userId is provided', async () => {
      jest
        .spyOn(userIdentityService, 'findAll')
        .mockResolvedValue(mockUserIdentityArray);

      const result = await userIdentityController.findAll(undefined);

      expect(result).toEqual(mockUserIdentityArray);
      expect(userIdentityService.findAll).toHaveBeenCalled();
    });

    it('should return userIdentities by user ID when userId is provided', async () => {
      const userId = 123;

      jest
        .spyOn(userIdentityService, 'findByUserId')
        .mockResolvedValue(mockUserIdentityArray);

      const result = await userIdentityController.findAll(userId);

      expect(result).toEqual(mockUserIdentityArray);
      expect(userIdentityService.findByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('findById', () => {
    it('should return a userIdentity by ID', async () => {
      // Mock data
      const userIdentityId = 1;
      const mockUserIdentity: UserIdentity = {
        id: userIdentityId,
        userId: 16,
        identityUsername: 'test',
        isEnabled: true,
        identityProvider: 'Password',
        isEmailVerified: true,
        isPhoneVerified: true,
        accountStatus: 'test',
        lastKnownIp: 'test',
        lastLoginDate: new Date(),
        createdAt: new Date(),
        createdBy: '1',
        updatedAt: new Date(),
        updatedBy: '1',
        user: new User(),
      };

      jest
        .spyOn(userIdentityService, 'findById')
        .mockResolvedValue(mockUserIdentity);

      const result = await userIdentityController.findById(userIdentityId);

      expect(result).toEqual(mockUserIdentity);
      expect(userIdentityService.findById).toHaveBeenCalledWith(userIdentityId);
    });
  });

  describe('groupByIdentityProvider', () => {
    it('should return grouped identities by provider', async () => {
      jest
        .spyOn(userIdentityService, 'groupByIdentityProvider')
        .mockResolvedValue(expectedGroupedData);

      const result = await userIdentityController.groupByIdentityProvider();

      expect(result).toEqual(expectedGroupedData);
      expect(userIdentityService.groupByIdentityProvider).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
