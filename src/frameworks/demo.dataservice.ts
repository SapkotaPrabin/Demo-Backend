import { CoreService } from 'core/core';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DemoDataService extends CoreService {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super();
    this.appDataSource = dataSource;
  }
}
