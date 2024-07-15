import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import request from 'supertest';
import { plainToInstance, instanceToPlain } from 'class-transformer';

import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';

import { Loyalty } from '@modules/loyalty/loyalty.entity';

import { UserService } from './user.service';
import { User } from './user.entity';
import { userFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserSearchResponseDTO, UserDetailResponseDTO } from './user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Loyalty),
          useClass: Repository,
        },
      ],
      controllers: [UserController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new CustomValidationPipe());
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  describe('GET /users/search', () => {
    it('should throw BadRequestException if no query parameter is passed', () => {
      return request(app.getHttpServer())
        .get('/users/search') // No query parameter
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The query parameter must be a non-empty string.',
          error: 'Bad Request',
        });
    });

    it('should throw BadRequestException if query parameter is only whitespace', () => {
      return request(app.getHttpServer())
        .get('/users/search?query=    ')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The query parameter must be a non-empty string.',
          error: 'Bad Request',
        });
    });

    it('should call userService.search when a valid query parameter is provided', async () => {
      const searchSpy = jest
        .spyOn(userService, 'search')
        .mockImplementation(async () => []);

      await request(app.getHttpServer())
        .get('/users/search?query=test')
        .expect(HttpStatus.OK);

      expect(searchSpy).toHaveBeenCalledWith('test');

      searchSpy.mockRestore();
    });

    it('should return expected results when a valid query parameter is provided', async () => {
      const users = userFactory.buildList(2);
      // Move this to utlity
      const transformedUsers = instanceToPlain(
        plainToInstance(UserSearchResponseDTO, users, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUsers,
      };

      jest.spyOn(userService, 'search').mockImplementation(async () => users);

      await request(app.getHttpServer())
        .get('/users/search?query=test')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user details for a valid ID', async () => {
      const user = userFactory.build();
      const transformedUser = instanceToPlain(
        plainToInstance(UserDetailResponseDTO, user, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUser,
      };
      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      await request(app.getHttpServer())
        .get('/users/1')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/users/999')
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
    });
  });

  describe('PATCH /users/:id', () => {
    it('should successfully update a user', async () => {
      const updatedUser = userFactory.build();
      const transformedUser = instanceToPlain(
        plainToInstance(UserDetailResponseDTO, updatedUser, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUser,
      };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      await request(app.getHttpServer())
        .patch('/users/1')
        .send({
          firstName: 'Updated',
          lastName: 'User',
          mobile: '123',
          email: 'user@email.com',
        })
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw validation errors for invalid data', async () => {
      await request(app.getHttpServer())
        .patch('/users/1')
        .send({ firstName: '', lastName: '', mobile: '', email: '' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          errors: {
            firstName: ['firstName should not be empty'],
            lastName: ['lastName should not be empty'],
            mobile: ['mobile should not be empty'],
            email: ['email must be an email', 'email should not be empty'],
          },
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      jest.spyOn(userService, 'updateUser').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      await request(app.getHttpServer())
        .patch('/users/999')
        .send({
          firstName: 'Nonexistent',
          lastName: 'User',
          mobile: '123',
          email: 'user@email.com',
        })
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
    });
  });

  describe('GET /users/registration-stats', () => {
    it('should return registration stats for the last 30 days', async () => {
      const mockRegistrationStats = [
        {
          totalRegistration: 5,
          dateRegistered: '2023-11-15',
          identityProvider: 'Google',
        },
        {
          totalRegistration: 8,
          dateRegistered: '2023-11-16',
          identityProvider: 'Google',
        },
      ];
      const mockResponse = {
        data: mockRegistrationStats,
      };

      jest
        .spyOn(userService, 'getRegistrationStatsLast30Days')
        .mockResolvedValue(mockRegistrationStats);

      await request(app.getHttpServer())
        .get('/users/registration-stats')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid identity provider', async () => {
      const invalidIdentityProvider = 'InvalidProvider';

      jest
        .spyOn(userService, 'getRegistrationStatsLast30Days')
        .mockImplementation(() => {
          throw new NotFoundException('Identity provider not found');
        });

      await request(app.getHttpServer())
        .get(
          `/users/registration-stats?identityProvider=${invalidIdentityProvider}`,
        )
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Identity provider not found',
          error: 'Not Found',
        });
    });
  });

  describe('PATCH /users/:id/block', () => {
    it('should successfully block a user', async () => {
      const updatedUser = userFactory.build({
        isBlocked: true,
        blockedReason: 'Testing',
      });
      const transformedUser = instanceToPlain(
        plainToInstance(UserDetailResponseDTO, updatedUser, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUser,
      };
      jest.spyOn(userService, 'blockUser').mockResolvedValue(updatedUser);

      await request(app.getHttpServer())
        .patch('/users/1/block')
        .send({ blockReason: 'Testing' })
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw validation errors for invalid data', async () => {
      await request(app.getHttpServer())
        .patch('/users/1/block')
        .send({ blockReason: '' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          errors: {
            blockReason: ['blockReason should not be empty'],
          },
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      jest.spyOn(userService, 'blockUser').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      await request(app.getHttpServer())
        .patch('/users/999/block')
        .send({ blockReason: 'Testing' })
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
    });

    it('should throw BadRequestException for an already blocked user', async () => {
      jest.spyOn(userService, 'blockUser').mockImplementation(() => {
        throw new BadRequestException('User already blocked');
      });

      await request(app.getHttpServer())
        .patch('/users/999/block')
        .send({ blockReason: 'Testing' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already blocked',
          error: 'Bad Request',
        });
    });
  });

  describe('PATCH /users/:id/unblock', () => {
    it('should successfully unblock a user', async () => {
      const updatedUser = userFactory.build();
      const transformedUser = instanceToPlain(
        plainToInstance(UserDetailResponseDTO, updatedUser, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUser,
      };
      jest.spyOn(userService, 'unblockUser').mockResolvedValue(updatedUser);

      await request(app.getHttpServer())
        .patch('/users/1/unblock')
        .send({})
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      jest.spyOn(userService, 'unblockUser').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      await request(app.getHttpServer())
        .patch('/users/999/unblock')
        .send({})
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
    });

    it('should throw BadRequestException for an already unblock user', async () => {
      jest.spyOn(userService, 'unblockUser').mockImplementation(() => {
        throw new BadRequestException('User already unblocked');
      });

      await request(app.getHttpServer())
        .patch('/users/999/unblock')
        .send({})
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already unblocked',
          error: 'Bad Request',
        });
    });
  });

  describe('GET /users/deletion-stats', () => {
    it('should return deletion stats for the last 30 days', async () => {
      const mockDeletionStats = [
        {
          totalDeleted: 3,
          dayDeleted: '2023-11-15',
        },
        {
          totalDeleted: 5,
          dayDeleted: '2023-11-16',
        },
      ];
      const mockResponse = {
        data: mockDeletionStats,
      };

      jest
        .spyOn(userService, 'getDeletedAcountsStatsLast30Days')
        .mockResolvedValue(mockDeletionStats);

      await request(app.getHttpServer())
        .get('/users/deletion-stats')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should handle errors from userService.getDeletedAcountsStatsLast30Days', async () => {
      jest
        .spyOn(userService, 'getDeletedAcountsStatsLast30Days')
        .mockImplementation(() => {
          throw new NotFoundException('Deletion stats not found');
        });

      await request(app.getHttpServer())
        .get('/users/deletion-stats')
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Deletion stats not found',
          error: 'Not Found',
        });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should successfully delete a user', async () => {
      const deletedUser = userFactory.build();
      const transformedUser = instanceToPlain(
        plainToInstance(UserDetailResponseDTO, deletedUser, {
          excludeExtraneousValues: true,
        }),
      );
      const mockResponse = {
        data: transformedUser,
      };
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser);

      await request(app.getHttpServer())
        .delete('/users/1')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      await request(app.getHttpServer())
        .delete('/users/999')
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not Found',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
