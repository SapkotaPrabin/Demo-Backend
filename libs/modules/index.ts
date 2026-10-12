import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreService } from 'core/core';
import { DemoDataService } from 'src/frameworks/demo.dataservice';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    DemoDataService,
    CoreService,
  ],
  exports: [ DemoDataService, CoreService],
})
export class SharedModule {}
