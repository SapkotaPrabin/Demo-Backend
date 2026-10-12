import { ForbiddenException, Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProxyMiddleware.name);
  constructor(
    @Inject('ROUTES') private readonly routes: any
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    let formattedUrl: string;
    formattedUrl = request.originalUrl.replace(/\?.*$/, '');
    const route = this.routes[formattedUrl];
    if (!!route) {
      if (!!route.auth && !!route.permissions) {
        const routePermissions = route['permissions'].map((permission: string) => `${permission}`);
        const userPermissions = request['user']['permissions'];
        const isPermissionIncluded = routePermissions.some((permission) => userPermissions?.includes(permission));
        if (!isPermissionIncluded) {
          console.error('Permission unmatched: URL- ', formattedUrl, ' Required Permissions-', routePermissions);
          throw new ForbiddenException('Unauthorized Request : permission unmatched');
        }
      }
    }

    next();
  }
}
