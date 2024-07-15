import { Test, TestingModule } from '@nestjs/testing';
import { UserIdentityService } from './userIdentity.service';
import { Repository } from 'typeorm';
import { UserIdentity } from './userIdentity.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';

describe('UserIdentityService', () => {
  let userIdentityService: UserIdentityService;
  let userIdentityRepository: Repository<UserIdentity>;

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

  const mockUserIdentityRepository = {
    find: jest.fn().mockResolvedValue(mockUserIdentityArray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserIdentityService,
        {
          provide: getRepositoryToken(UserIdentity),
          useValue: mockUserIdentityRepository,
        },
      ],
    }).compile();

    userIdentityService = module.get<UserIdentityService>(UserIdentityService);
    userIdentityRepository = module.get<Repository<UserIdentity>>(
      getRepositoryToken(UserIdentity),
    );
  });

  it('should be defined', () => {
    expect(userIdentityService).toBeDefined();
  });

  describe('findByUserId', () => {
    it('should return an array of users Identity retrieved by userId', async () => {
      const userIdentities = await userIdentityService.findByUserId(1);
      expect(userIdentities).toBe(mockUserIdentityArray);
    });

    it('should call the find method from the userIdentityRepository retrieved by userId', async () => {
      await userIdentityService.findByUserId(1);
      expect(userIdentityRepository.find).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users Identity', async () => {
      const userIdentities = await userIdentityService.findAll();
      expect(userIdentities).toBe(mockUserIdentityArray);
    });

    it('should call the find method from the userIdentityRepository', async () => {
      await userIdentityService.findAll();
      expect(userIdentityRepository.find).toHaveBeenCalled();
    });
  });

  describe('groupByIdentityProvider', () => {
    it('should return an object with identity providers and their counts', async () => {
      const groupedIdentities =
        await userIdentityService.groupByIdentityProvider();

      const expectedGroupedData = {};

      for (const identity of mockUserIdentityArray) {
        if (!expectedGroupedData[identity.identityProvider]) {
          expectedGroupedData[identity.identityProvider] = 1;
        } else {
          expectedGroupedData[identity.identityProvider]++;
        }
      }

      expect(groupedIdentities).toEqual(expectedGroupedData);
    });

    it('should call the find method from the userIdentityRepository', async () => {
      await userIdentityService.groupByIdentityProvider();
      expect(userIdentityRepository.find).toHaveBeenCalled();
    });
  });
});
