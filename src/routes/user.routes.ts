import { GenericServiceRouteConfig } from './generic-service.routes';

export class UserRouteConfig extends GenericServiceRouteConfig {
  static baseURLConfigField = process.env.CORE_SERVICE_ENDPOINT;

  constructor() {
    super(UserRouteConfig.baseURLConfigField);
  }

  routes = [
    {
      source: '/user/profile',
      target: `/user/profile`,
      auth: true,
    },
  ];
}
