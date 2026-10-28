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
import { AuthUseCase } from './user/application/usecases/auth.usecase';
import { typeOrmConfigs } from './frameworks/config/database.config';
import { AuthController } from './user/controllers/auth/auth.controller';
import { UserRepository } from './user/repositories/user.repository';
import { TokenService } from './user/application/services/token.service';
import { MerchantApplication } from './frameworks/entities/merchant_application.entity';
import { User } from './frameworks/entities/user.entity';
import { ApplicationController } from './merchant_application/controllers/application/application.controller';
import { MerchantApplicationRepository } from './merchant_application/repositories/merchant_application.repository';
import { ApplicationUseCase } from './merchant_application/application/usecases/application.usecase';
import { UserUseCase } from './user/application/usecases/user.usecase';
import { UserController } from './user/controllers/user/user.controller';
import { LoggerService } from './merchant_application/application/services/logger.service';

// Import Core Service configuration and providers
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
    TypeOrmModule.forFeature([MerchantApplication, User]),
    SharedModule,
    CoreModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    HttpModule,
  ],
  controllers: [AuthController, UserController, ApplicationController],
  providers: [
    RouteProvider,
    AuthUseCase,
    UserUseCase,
    ApplicationUseCase,
    UserRepository,
    TokenService,
    MerchantApplicationRepository,
    LoggerService,
    {
      provide: AuthUseCase,
      inject: [UserRepository, TokenService],
      useFactory: (userRepository: UserRepository, tokenService: TokenService) => {
        return new AuthUseCase(userRepository, tokenService);
      },
    },
    {
      provide: UserUseCase,
      inject: [UserRepository],
      useFactory: (userRepository: UserRepository) => {
        return new UserUseCase(userRepository);
      },
    },
    {
      provide: ApplicationUseCase,
      inject: [UserRepository, MerchantApplicationRepository, LoggerService],
      useFactory: (userRepository: UserRepository, merchantApplicationRepository: MerchantApplicationRepository, loggerService: LoggerService) => {
        return new ApplicationUseCase(userRepository, merchantApplicationRepository, loggerService);
      },
    },
  ],
})
export class DemoGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(ProxyMiddleware).forRoutes('*');
  }
}
