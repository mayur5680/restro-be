import { Test, TestingModule } from '@nestjs/testing';
import { Resto365RoleController } from './resto365-role.controller';
import { Resto365RoleService } from './resto365-role.service';
import { AuthService } from '@modules/auth/auth.service';

describe('Resto365RoleController', () => {
  let controller: Resto365RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365RoleController],
      providers: [
        {
          provide: Resto365RoleService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<Resto365RoleController>(Resto365RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
