import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '../../../middlewares/user.decorator';
import { CreateApplicationDto } from '../../business/dtos/application.dto';
import { ApplicationUseCase } from 'src/merchant_application/application/usecases/application.usecase';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationUseCase: ApplicationUseCase) {}

  @Post('')
  async create(@User() user: any, @Body() body: CreateApplicationDto) {
    return await this.applicationUseCase.create(user, body);
  }

  @Get('')
  async getApplicationList(@User() user: any, @Query() query: { page?: number; limit?: number }) {
    return await this.applicationUseCase.getApplicationList(user, query);
  }
}
