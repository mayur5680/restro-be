import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalIdentityController } from './userExternalIdentity.controller';
import { UserExternalIdentityService } from './userExternalIdentity.service';
import { UserExternalIdentity } from './userExternalIdentity.entity';
import { NotFoundException } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity';

describe('UserExternalIdentityController', () => {
  let app: INestApplication;
  let userExternalIdentityController: UserExternalIdentityController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserExternalIdentityController],
      providers: [
        UserExternalIdentityService,
        {
          provide: getRepositoryToken(UserExternalIdentity),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userExternalIdentityController =
      moduleFixture.get<UserExternalIdentityController>(
        UserExternalIdentityController,
      );

    await app.init();
  });

  it('should be defined', () => {
    expect(userExternalIdentityController).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user External Identity by ID', async () => {
      const userExternalIdentityId = 123;
      const mockUserExternalIdentity = new UserExternalIdentity();
      mockUserExternalIdentity.id = userExternalIdentityId;
      jest
        .spyOn(userExternalIdentityController, 'findById')
        .mockResolvedValue(mockUserExternalIdentity);

      const result = await userExternalIdentityController.findById(
        userExternalIdentityId,
      );
      expect(result).toEqual(mockUserExternalIdentity);
    });

    it('should throw NotFoundException when user External Identity is not found', async () => {
      const userExternalIdentityId = 456;
      jest
        .spyOn(userExternalIdentityController, 'findById')
        .mockRejectedValue(
          new NotFoundException(
            `UserExternalIdentity with ID ${userExternalIdentityId} not found`,
          ),
        );

      await expect(
        userExternalIdentityController.findById(userExternalIdentityId),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return user External Identities by user ID', async () => {
      const userId = 789;
      const mockUserExternalIdentity = new UserExternalIdentity();
      mockUserExternalIdentity.user = new User();
      mockUserExternalIdentity.user.id = userId;
      jest
        .spyOn(userExternalIdentityController, 'findAll')
        .mockResolvedValue([mockUserExternalIdentity]);

      const result = await userExternalIdentityController.findAll(userId);
      expect(result).toEqual([mockUserExternalIdentity]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
