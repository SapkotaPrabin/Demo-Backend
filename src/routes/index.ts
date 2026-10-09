import { UserServiceRouteConfig } from './user-service.routes';
export class ServiceRouteProvider {
  allServiceRoutes: any;

  constructor() {
    this.allServiceRoutes = [
      ...new UserServiceRouteConfig().getRoutes()
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
