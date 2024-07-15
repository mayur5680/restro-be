import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as Resto365User;
  },
);
