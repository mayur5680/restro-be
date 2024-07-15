import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.correlationId as string;
  },
);
