import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelGroupMenuTemplateService } from './channel-group-menu-template.service';
import { ChannelGroupMenuTemplate } from './entities/channel-group-menu-template.entity';
import { CreateChannelGroupMenuTemplateDto } from './dto/create-channel-group-menu-template.dto';

describe('ChannelGroupMenuTemplateService', () => {
  let service: ChannelGroupMenuTemplateService;
  let repository: Repository<ChannelGroupMenuTemplate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelGroupMenuTemplateService,
        {
          provide: getRepositoryToken(ChannelGroupMenuTemplate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChannelGroupMenuTemplateService>(
      ChannelGroupMenuTemplateService,
    );
    repository = module.get<Repository<ChannelGroupMenuTemplate>>(
      getRepositoryToken(ChannelGroupMenuTemplate),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ChannelGroupMenuTemplate', async () => {
      const createDto: CreateChannelGroupMenuTemplateDto = {
        channelGroupId: 1,
        menuTemplateId: 2,
        isActive: true,
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 2,
      };

      const entity = new ChannelGroupMenuTemplate();
      jest.spyOn(repository, 'create').mockReturnValue(entity);
      jest.spyOn(repository, 'save').mockResolvedValue(entity);

      const result = await service.create(createDto);
      expect(result).toEqual(entity);
    });
  });

  describe('findAll', () => {
    it('should return an array of ChannelGroupMenuTemplates', async () => {
      const entities = [
        new ChannelGroupMenuTemplate(),
        new ChannelGroupMenuTemplate(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(entities);

      const result = await service.findAll();
      expect(result).toEqual(entities);
    });
  });

  describe('findById', () => {
    it('should return a ChannelGroupMenuTemplate by ID', async () => {
      const entity = new ChannelGroupMenuTemplate();
      jest.spyOn(repository, 'findOne').mockResolvedValue(entity);

      const result = await service.findById(1);
      expect(result).toEqual(entity);
    });
  });

  describe('update', () => {
    it('should update a ChannelGroupMenuTemplate', async () => {
      const updateDto: Partial<CreateChannelGroupMenuTemplateDto> = {
        isActive: false,
      };

      const entity = new ChannelGroupMenuTemplate();
      jest.spyOn(service, 'findById').mockResolvedValue(entity);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(service, 'findById').mockResolvedValue(entity);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(entity);
    });
  });

  describe('remove', () => {
    it('should remove a ChannelGroupMenuTemplate', async () => {
      const entity = new ChannelGroupMenuTemplate();
      jest.spyOn(service, 'findById').mockResolvedValue(entity);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(1);
    });
  });
});
