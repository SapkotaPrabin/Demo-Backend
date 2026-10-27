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
      source: '/applications/:id/assign',
      target: `/applications/:id/assign`,
      auth: true,
    },
    {
      source: '/applications/:id/submit',
      target: `/applications/:id/submit`,
      auth: true,
    },
    {
      source: '/applications/:id/decision',
      target: `/applications/:id/decision`,
      auth: true,
    },
  ];
}
