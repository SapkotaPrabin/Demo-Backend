import { Module } from '@nestjs/common';
import { CoreService } from './infrastructure/core.service';

@Module({
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
