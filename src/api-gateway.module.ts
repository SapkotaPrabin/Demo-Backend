import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ProxyMiddleware } from './middlewares/proxy.middleware';
import { ServiceRouteProvider } from './routes';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { SharedModule } from 'libs/modules';
import { CoreModule } from 'core/core';

// Import Core Service configuration and providers
import { typeOrmConfigs } from 'src/user/frameworks/config/database.config';

const RouteProvider = {
  provide: 'ROUTES',
  useFactory: () => {
    return new ServiceRouteProvider().format();
  },
};

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfigs),
    SharedModule,
    CoreModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [
    RouteProvider
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(ProxyMiddleware).forRoutes('*');
  }
}
