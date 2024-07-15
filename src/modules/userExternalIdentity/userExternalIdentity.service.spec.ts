import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalIdentityService } from './userExternalIdentity.service';
import { Repository } from 'typeorm';
import { UserExternalIdentity } from './userExternalIdentity.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';

describe('UserExternalIdentityService', () => {
  let userExternalIdentityService: UserExternalIdentityService;
  let userExternalIdentityRepository: Repository<UserExternalIdentity>;

  const mockUserExternalIdentityArray: UserExternalIdentity[] = [
    {
      id: 123,
      userId: 1,
      customerId: '765',
      email: 'test@test.com',
      brazeId: '123',
      isBrazeEnabled: true,
      createdAt: new Date(),
      createdBy: '123',
      updatedAt: new Date(),
      updatedBy: '123',
      branchDeepLink: 'test',
      branchId: '123',
      emailSubscription: true,
      smsSubscription: true,
      pushNotificationSubscription: true,
      user: new User(),
    },
  ];

  const mockUserExternalIdentityRepository = {
    findOne: jest.fn().mockResolvedValue(mockUserExternalIdentityArray[0]),
    find: jest.fn().mockResolvedValue(mockUserExternalIdentityArray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserExternalIdentityService,
        {
          provide: getRepositoryToken(UserExternalIdentity),
          useValue: mockUserExternalIdentityRepository,
        },
      ],
    }).compile();

    userExternalIdentityService = module.get<UserExternalIdentityService>(
      UserExternalIdentityService,
    );
    userExternalIdentityRepository = module.get<
      Repository<UserExternalIdentity>
    >(getRepositoryToken(UserExternalIdentity));
  });

  it('should be defined', () => {
    expect(userExternalIdentityService).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user external Identity by ID', async () => {
      const userExternalIdentityId = 123;
      const mockUserExternalIdentity = mockUserExternalIdentityArray[0];
      jest
        .spyOn(userExternalIdentityRepository, 'findOne')
        .mockResolvedValue(mockUserExternalIdentity);

      const result = await userExternalIdentityService.findById(
        userExternalIdentityId,
      );
      expect(userExternalIdentityRepository.findOne).toHaveBeenCalledWith({
        where: { id: userExternalIdentityId },
      });
      expect(result).toEqual(mockUserExternalIdentity);
    });
  });

  describe('findByUserId', () => {
    it('should return an array of user External Identities retrieved by userId', async () => {
      const userExternalIdentities =
        await userExternalIdentityService.findByUserId(1);
      expect(userExternalIdentities).toBe(mockUserExternalIdentityArray);
    });

    it('should call the find method from the userExternalIdentityRepository retrieved by userId', async () => {
      await userExternalIdentityService.findByUserId(1);
      expect(userExternalIdentityRepository.findOne).toHaveBeenCalled();
    });
  });
});
