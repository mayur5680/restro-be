import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { Resto365UserService } from '@modules/resto365-user/resto365-user.service';
import { ConfigService } from '@modules/config/config.service';
import { UnauthorizedException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuthService } from './auth.service';
import { Scope } from '@modules/resto365-role/entities/resto365-role.entity';
import { AuditMetadata } from '@modules/store/entities/store.entity';
import { Resto365RoleService } from '@modules/resto365-role/resto365-role.service';

const mockR365User: Resto365User = {
  email: 'test@example.com',
  name: 'Test User',
  id: 1,
  oktaId: '1234567',
  createdBy: 1,
  roleId: 1,
  department: 'Digital IT',
  phone: '+1234567890',
  roleName: 'Admin',
  countries: [],
  areas: [],
  restaurants: [],
  permissions: { restaurant: ['read', 'update'] },
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  deletedAt: new Date(),
  deletedBy: 1,
  updatedBy: 1,
  role: {
    id: 1,
    name: 'Administrator',
    description: 'Administrator role',
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    createdBy: 1,
    deletedAt: new Date(),
    deletedBy: 1,
    updatedBy: 1,
    isCustomRole: false,
    scope: Scope.Country,
    permissions: [],
    _metadata: {} as AuditMetadata,
  },
  hasPermission: () => true,
  _metadata: {} as AuditMetadata,
};

const mockToken = 'XXYYYZZZ111222333444555666777888999000';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            oktaConfig: {
              oktaApiUrl: '',
              oktaApiToken: '',
              oktaUserInfoUrl: '',
            },
          },
        },
        {
          provide: Resto365UserService,
          useValue: {
            findByOktaId: () => {
              return mockR365User;
            },
          },
        },
        {
          provide: Resto365RoleService,
          useValue: {
            findOne: () => {
              return mockR365User.role;
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            authenticate: () => Promise.resolve(mockR365User),
          },
        },
      ],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
  });

  it('should call next()', async () => {
    const req = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    jest.spyOn(middleware, 'setCurrentUser');

    await middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('If valid user, should set the current user and isAuthenticated to true', async () => {
    const req = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const res = {} as Response;
    const next = jest.fn();

    await middleware.use(req, res, next);

    expect(req.user).toEqual(mockR365User);
    expect(req.isAuthenticated).toBeTruthy();
  });

  it('If invalid user, should return a UnauthorizedException', async () => {
    const req = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    const setCurrentUserSpy = jest.spyOn(middleware, 'setCurrentUser');
    setCurrentUserSpy.mockRejectedValue(new Error('Verification failed'));

    await middleware.use(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedException));
  });
});
