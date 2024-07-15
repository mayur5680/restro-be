import { SetMetadata } from '@nestjs/common';
import { Action, Subject } from './types';

export type PermissionArg = `${Action}:${Subject}`;

export const Acl = (...permissions: PermissionArg[]) =>
  SetMetadata('permissions', permissions);
