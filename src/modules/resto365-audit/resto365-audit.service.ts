import { Injectable } from '@nestjs/common';
import { CreateResto365AuditDto } from './dto/create-resto365-audit.dto';
import {
  EntitySource,
  Origin,
  Resto365Audit,
} from './entities/resto365-audit.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type CountParams = {
  origin?: Origin;
  dateFrom?: Date;
  dateTo?: Date;
  userId?: number;
  entitySource?: EntitySource;
  entitySourceId?: number;
};
type FindAllParams = CountParams & {
  page: number;
};
@Injectable()
export class Resto365AuditService {
  private readonly pageSize = 5;
  constructor(
    @InjectRepository(Resto365Audit, 'r365')
    private auditRepository: Repository<Resto365Audit>,
  ) {}
  create(createResto365AuditDto: CreateResto365AuditDto) {
    const audit = new Resto365Audit();
    audit.origin = createResto365AuditDto.origin;
    audit.roleId = createResto365AuditDto.roleId;
    audit.roleName = createResto365AuditDto.roleName;
    audit.action = createResto365AuditDto.action;
    audit.requestedValue = createResto365AuditDto.requestedValue;
    audit.initialValue = createResto365AuditDto.initialValue;
    audit.updatedValue = createResto365AuditDto.updatedValue;
    audit.subject = createResto365AuditDto.subject;
    audit.username = createResto365AuditDto.username;
    audit.userId = createResto365AuditDto.userId;
    audit.correlationId = createResto365AuditDto.correlationId;
    audit.email = createResto365AuditDto.email;
    audit.entitySource = createResto365AuditDto.entitySource;
    audit.entitySourceId = createResto365AuditDto.entitySourceId;
    audit.module = createResto365AuditDto.module;
    audit.description = createResto365AuditDto.description;
    return this.auditRepository.save(audit);
  }

  async findAll(params: FindAllParams): Promise<Resto365Audit[]> {
    const where = {
      origin: params.origin,
      createdAt: Between(params.dateFrom, params.dateTo),
      entitySource: params.entitySource,
      entitySourceId: params.entitySourceId,
      ...(params.userId ? { userId: params.userId } : {}),
    };
    const records = await this.auditRepository.find({
      select: [
        'id',
        'createdAt',
        'username',
        'action',
        'subject',
        'entitySource',
        'entitySourceId',
        'requestedValue',
        'roleId',
        'roleName',
        'module',
        'description',
      ],
      skip: (params.page - 1) * this.pageSize,
      take: this.pageSize,
      order: {
        id: 'DESC',
      },
      where,
    });
    return records;
  }

  async getCount(params: CountParams): Promise<number> {
    const where = {
      origin: params.origin,
      createdAt: Between(params.dateFrom, params.dateTo),
      entitySource: params.entitySource,
      entitySourceId: params.entitySourceId,
      ...(params.userId ? { userId: params.userId } : {}),
    };
    const count = await this.auditRepository.count({ where });
    return count;
  }

  findOne(id: number) {
    return `This action returns a #${id} resto365Audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} resto365Audit`;
  }
}
