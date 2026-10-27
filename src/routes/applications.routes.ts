import { GenericServiceRouteConfig } from './generic-service.routes';

export class ApplicationsRouteConfig extends GenericServiceRouteConfig {
  static baseURLConfigField = process.env.CORE_SERVICE_ENDPOINT;

  constructor() {
    super(ApplicationsRouteConfig.baseURLConfigField);
  }

  routes = [
    {
      source: '/applications',
      target: `/applications`,
      auth: true,
    },
    {
      source: '/applications/:id',
      target: `/applications/:id`,
      auth: true,
    },
    {
      source: '/applications/risk-decision/:id',
      target: `/applications/risk-decision/:id`,
      auth: true,
    }
  ];
}
