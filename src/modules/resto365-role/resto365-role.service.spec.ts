import { Test, TestingModule } from '@nestjs/testing';
import { Resto365RoleService } from './resto365-role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365Role } from './entities/resto365-role.entity';
import { Repository } from 'typeorm';

describe('Resto365RoleService', () => {
  let service: Resto365RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365RoleService,
        {
          provide: getRepositoryToken(Resto365Role, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365RoleService>(Resto365RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
