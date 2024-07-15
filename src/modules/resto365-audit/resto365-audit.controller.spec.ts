import { Test, TestingModule } from '@nestjs/testing';
import { Resto365AuditController } from './resto365-audit.controller';
import { Resto365AuditService } from './resto365-audit.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365Role } from '@modules/resto365-role/entities/resto365-role.entity';
import { ParseDatePipe } from 'src/shared/parseDatePipe';
import {
  EntitySource,
  Origin,
  Resto365Audit,
} from './entities/resto365-audit.entity';
import { randomUUID } from 'crypto';
import { AuditMetadata } from '@modules/store/entities/store.entity';

describe('Resto365AuditController', () => {
  let controller: Resto365AuditController;
  let resto365AuditService: Resto365AuditService;

  const mockUser: Resto365User = {
    id: 1,
    oktaId: 'oktaId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: '',
    phone: '',
    roleId: 0,
    role: new Resto365Role(),
    countries: [],
    areas: [],
    restaurants: [],
    roleName: '',
    permissions: undefined,
    createdAt: undefined,
    createdBy: 0,
    updatedAt: undefined,
    updatedBy: 0,
    version: 0,
    deletedAt: undefined,
    deletedBy: 0,
    hasPermission: () => true,
    _metadata: {} as AuditMetadata,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365AuditController],
      providers: [
        {
          provide: Resto365AuditService,
          useValue: {
            findAll: jest.fn(),
            getCount: jest.fn(),
          },
        },
        ParseDatePipe,
      ],
    }).compile();

    controller = module.get<Resto365AuditController>(Resto365AuditController);
    resto365AuditService =
      module.get<Resto365AuditService>(Resto365AuditService);
  });

  describe('findAll', () => {
    it('should return audit log entries', async () => {
      const mockEntries: Resto365Audit[] = [
        {
          id: 1,
          createdAt: new Date('2023-04-01'),
          userId: 1,
          action: 'PATCH',
          correlationId: randomUUID(),
          email: '',
          entitySource: EntitySource.Restaurant,
          entitySourceId: 0,
          initialValue: {},
          origin: Origin.Api,
          requestedValue: {},
          roleId: 0,
          roleName: '',
          subject: '',
          updatedValue: {},
          username: '',
        },
        {
          id: 1,
          createdAt: new Date('2023-04-02'),
          userId: 1,
          action: 'DELETE',
          correlationId: randomUUID(),
          email: '',
          entitySource: EntitySource.Restaurant,
          entitySourceId: 0,
          initialValue: {},
          origin: Origin.Api,
          requestedValue: {},
          roleId: 0,
          roleName: '',
          subject: '',
          updatedValue: {},
          username: '',
        },
      ];

      jest
        .spyOn(resto365AuditService, 'findAll')
        .mockResolvedValue(mockEntries);

      const response = await controller.findAll(
        mockUser,
        1,
        1,
        new Date('2023-04-01T00:00:00Z'),
        new Date('2023-04-30T23:59:59Z'),
        EntitySource.Restaurant,
        1,
      );

      expect(resto365AuditService.findAll).toHaveBeenCalledWith({
        page: 1,
        origin: Origin.Api,
        dateFrom: new Date('2023-04-01T00:00:00Z'),
        dateTo: new Date('2023-04-30T23:59:59Z'),
        userId: 1,
        entitySource: EntitySource.Restaurant,
        entitySourceId: 1,
      });
      expect(response).toEqual(mockEntries);
    });
  });

  describe('count', () => {
    it('should return the count of audit log entries', async () => {
      const mockCount = 10;

      jest.spyOn(resto365AuditService, 'getCount').mockResolvedValue(mockCount);

      const response = await controller.count(
        mockUser,
        1,
        new Date('2023-04-01T00:00:00Z'),
        new Date('2023-04-30T23:59:59Z'),
        EntitySource.Restaurant,
        1,
      );

      expect(resto365AuditService.getCount).toHaveBeenCalledWith({
        origin: Origin.Api,
        dateFrom: new Date('2023-04-01T00:00:00Z'),
        dateTo: new Date('2023-04-30T23:59:59Z'),
        userId: 1,
        entitySource: EntitySource.Restaurant,
        entitySourceId: 1,
      });
      expect(response).toEqual(mockCount);
    });
  });
});
