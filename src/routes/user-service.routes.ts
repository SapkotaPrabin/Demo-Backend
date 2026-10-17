import { GenericServiceRouteConfig } from './generic-service.routes';

export class UserServiceRouteConfig extends GenericServiceRouteConfig {
  static baseURLConfigField = process.env.CORE_SERVICE_ENDPOINT;

  constructor() {
    super(UserServiceRouteConfig.baseURLConfigField);
  }

  routes = [
    {
      source: '/auth/login',
      target: `/auth/login`,
      auth: false,
    },
  ];
}
