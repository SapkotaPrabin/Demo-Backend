import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userData = request.user ?? request?.raw?.['user'];
  const logIdentifier = request.user?.logIdentifier ?? request?.raw?.['logIdentifier'];
  userData['logIdentifier'] = logIdentifier;
  return userData;
});
