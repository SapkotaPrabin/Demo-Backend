import { RouteType } from './types';

export class GenericServiceRouteConfig {
  baseURL: string;
  routes: Array<RouteType>;

  constructor(baseURLConfig) {
    this.baseURL = `${baseURLConfig}`;
  }

  getRoutes() {
    return this.routes.map((route) => ({
      ...route,
      target: `${route.target}`,
      baseUrl: `${this.baseURL}`
    }));
  }
}
