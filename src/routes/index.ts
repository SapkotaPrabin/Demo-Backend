import { ApplicationsRouteConfig } from './applications.routes';
import { AuthRouteConfig } from './auth.routes';
import { UserRouteConfig } from './user.routes';
export class ServiceRouteProvider {
  allServiceRoutes: any;

  constructor() {
    this.allServiceRoutes = [
      ...new AuthRouteConfig().getRoutes(),
      ...new UserRouteConfig().getRoutes(),
      ...new ApplicationsRouteConfig().getRoutes(),
    ];
  }

  format() {
    return this.allServiceRoutes.reduce(
      (routes, route) => ({
        ...routes,
        [route.source]: route,
      }),
      {},
    );
  }
}
