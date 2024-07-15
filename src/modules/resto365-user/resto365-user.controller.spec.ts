import { Test, TestingModule } from '@nestjs/testing';
import { Resto365UserController } from './resto365-user.controller';
import { Resto365UserService } from './resto365-user.service';
import { Resto365User } from './entities/resto365-user.entity';
import { Resto365UserResponseDTO } from './dto/resto365-user-response.dto';
import { Scope } from '@modules/resto365-role/entities/resto365-role.entity';
import { AuditMetadata } from '@modules/store/entities/store.entity';
import { AuthService } from '@modules/auth/auth.service';

describe('Resto365UserController', () => {
  let controller: Resto365UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365UserController],
      providers: [
        {
          provide: Resto365UserService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<Resto365UserController>(Resto365UserController);
  });

  const r365UserArg: Resto365User = {
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
      description: 'Administrator',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 1,
      deletedAt: new Date(),
      deletedBy: 1,
      updatedBy: 1,
      scope: Scope.Country,
      isCustomRole: false,
      permissions: [],
      _metadata: {} as AuditMetadata,
    },
    hasPermission: () => true,
    _metadata: {} as AuditMetadata,
  };

  describe('findMe', () => {
    it('should return the authenticated Resto365User', async () => {
      const authenticatedUser: Resto365User = {
        ...r365UserArg,
      } as Resto365User;

      const result = await controller.findMe(authenticatedUser);

      const expectedValue: Resto365UserResponseDTO = {
        id: 1,
        email: 'test@example.com',
        department: 'Digital IT',
        name: 'Test User',
        phone: '+1234567890',
        role: {
          id: 1,
          name: 'Administrator',
          isCustomRole: false,
          scope: Scope.Country,
        },
        permissions: { restaurant: ['read', 'update'] },
        assignedCountries: [],
        assignedRestaurants: [],
        assignedAreas: [],
      };
      expect(result).toEqual(expectedValue);
    });
  });
});
