import { CoreService } from 'core/core';
import AppDataSource from './datasource';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoDataService extends CoreService {
  constructor() {
    super();
    this.appDataSource = AppDataSource;
  }
}
