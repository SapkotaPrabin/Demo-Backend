import { GenericServiceRouteConfig } from './generic-service.routes';

export class AuthRouteConfig extends GenericServiceRouteConfig {
  static baseURLConfigField = process.env.CORE_SERVICE_ENDPOINT;

  constructor() {
    super(AuthRouteConfig.baseURLConfigField);
  }

  routes = [
    {
      source: '/auth/login',
      target: `/auth/login`,
      auth: false,
    },
  ];
}
