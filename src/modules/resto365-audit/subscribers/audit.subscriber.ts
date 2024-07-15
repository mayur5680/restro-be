/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resto365AuditService } from '@modules/resto365-audit/resto365-audit.service';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  DataSource,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { Origin } from '../entities/resto365-audit.entity';
import { GygLog } from 'src/shared';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<any> {
  protected source: Origin;
  private auditEntityName = 'Resto365Audit';
  private readonly logger = new GygLog(AuditSubscriber.name);
  constructor(
    @InjectDataSource('default') bhyveDatasoruce: DataSource,
    @InjectDataSource('r365') r365Datasource: DataSource,

    private readonly auditService: Resto365AuditService,
  ) {
    bhyveDatasoruce.subscribers.push(this);
    r365Datasource.subscribers.push(this);
  }

  getAuditType(datasource: string) {
    switch (datasource) {
      case 'r365':
        return Origin.Resto365DB;
      case 'default':
      default:
        return Origin.BhyveDB;
    }
  }

  async performAction(event: any, action: string) {
    const { entity, metadata, databaseEntity } = event;
    if (entity == null || metadata.name === this.auditEntityName) {
      return;
    }
    if (!entity._metadata) {
      this.logger.warn(
        this.performAction.name,
        `Audit metadata missing for event type: ${action} name: ${metadata.name} id: ${entity.id}`,
        '',
      );
    }

    const auditUser = entity._metadata?.auditUser;
    const correlationId = entity._metadata?.correlationId;
    delete entity._metadata;

    await this.auditService.create({
      action,
      correlationId: correlationId,
      userId: auditUser?.id,
      username: auditUser?.name,
      roleId: auditUser?.roleId,
      roleName: auditUser?.roleName,
      email: auditUser?.email,
      subject: metadata.name,
      initialValue: databaseEntity,
      updatedValue: entity,
      origin: this.getAuditType(metadata.connection.name),
      entitySource: metadata.name,
      entitySourceId: entity.id,
    });
  }
  /**
   * Called after entity insertion.
   */
  async afterInsert(event: InsertEvent<any>) {
    await this.performAction(event, 'INSERT');
  }

  /**
   * Called after entity update.
   */
  async afterUpdate(event: UpdateEvent<any>) {
    await this.performAction(event, 'UPDATE');
  }

  /**
   * Called after entity removal.
   */
  async afterRemove(event: RemoveEvent<any>) {
    await this.performAction(event, 'DELETE');
  }
}
