import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionArg } from './AclDecorator';

@Injectable()
export class AclGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionArg[]
    >('permissions', [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const { user }: { user: Resto365User } = context
      .switchToHttp()
      .getRequest();
    return requiredPermissions.every((permission) =>
      user.hasPermission(permission),
    );
  }
}
