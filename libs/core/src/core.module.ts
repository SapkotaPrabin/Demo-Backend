import { Module } from '@nestjs/common';
import { CoreService } from './infrastructure/core.service';
import { BullModule } from '@nestjs/bullmq';
import { getBullMqRedisConnection } from './services/bull-mq.service';

@Module({
  imports: [
    BullModule.forRoot({ connection: getBullMqRedisConnection() }),
  ],
  providers: [CoreService],
  exports: [CoreService, BullModule],
})
export class CoreModule {}
