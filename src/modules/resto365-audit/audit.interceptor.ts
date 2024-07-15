import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { Resto365AuditService } from './resto365-audit.service';
import { Origin } from './entities/resto365-audit.entity';
import { Reflector } from '@nestjs/core';
import { AuditModule, AuditableResponse } from './types';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private auditService: Resto365AuditService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
    /* eslint-disable @typescript-eslint/no-explicit-any */
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.method === 'GET') {
      return next.handle();
    }

    const module = this.reflector.get<AuditModule | undefined>(
      'audit:module',
      context.getClass(),
    );
    if (!module) {
      return next.handle();
    }

    const user: Resto365User = request.user;
    return next.handle().pipe(
      switchMap(async (response) => {
        if (response?.data?._metadata) {
          /*
            Deletes audit metadata from response
            TODO: Refactor this to be more robust
          */
          /*
              AuditableResponse<T> = {
                data: T;
                _metadata: {
                  entitySource: EntitySource;
                  entitySourceId: number;
                };
              }
            */
          const {
            _metadata: { entitySource, entitySourceId, description },
          } = response.data as AuditableResponse<any>;
          delete response.data._metadata;
          await this.auditService.create({
            userId: user.id,
            username: user.name,
            email: user.email,
            roleId: user.role.id,
            roleName: user.role.name,
            correlationId: request.correlationId,
            subject: request.url,
            action: request.method,
            requestedValue: request.body,
            updatedValue: getSafeUpdatedValue(response.data.data),
            origin: Origin.Api,
            module,
            entitySourceId,
            entitySource,
            description,
          });
          return { data: response.data.data };
        }
        return response.data;
      }),
    );
  }
}

/**
 * Gets a safe updated value for typeorm to insert into a JSON column
 * Workaround for now, remove later.
 * 'string' | 'number' | 'boolean' are perfectly valid json values. This is likely a bug in typeorm's json parsing
 * https://github.com/typeorm/typeorm/issues/5501
 */

function getSafeUpdatedValue(data: any) {
  if (data == null) {
    return {};
  }
  switch (typeof data) {
    case 'string':
    case 'number':
    case 'boolean':
      return { data };
    default:
      return data;
  }
}
