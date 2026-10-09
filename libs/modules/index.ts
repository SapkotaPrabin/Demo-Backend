import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayDataService } from 'api-gateway/src/frameworks/api-gateway.dataservice';
import { CoreService } from 'core/core';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    GatewayDataService,
    CoreService,
  ],
  exports: [ GatewayDataService, CoreService],
})
export class SharedModule {}
