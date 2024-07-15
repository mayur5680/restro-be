import { SetMetadata, Type } from '@nestjs/common';
import { AuditModule } from './types';

export const Audit = (data: AuditModule) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: Type<any>) => {
    SetMetadata('audit:module', data)(target);
  };
};
