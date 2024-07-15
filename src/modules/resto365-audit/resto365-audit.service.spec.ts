import { Test, TestingModule } from '@nestjs/testing';
import { Resto365AuditService } from './resto365-audit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365Audit } from './entities/resto365-audit.entity';

describe('Resto365AuditService', () => {
  let service: Resto365AuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365AuditService,
        {
          provide: getRepositoryToken(Resto365Audit, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365AuditService>(Resto365AuditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
