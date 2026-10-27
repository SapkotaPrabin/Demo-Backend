import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../../../middlewares/user.decorator';
import { CreateApplicationDto, UpdateApplicationDto } from '../../business/dtos/application.dto';
import { ApplicationUseCase } from 'src/merchant_application/application/usecases/application.usecase';
import { RiskDecision } from 'libs/utils/constants.utils';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationUseCase: ApplicationUseCase) {}

  @Post('')
  async create(@User() user: any, @Body() body: CreateApplicationDto) {
    return await this.applicationUseCase.create(user, body);
  }

  @Get('')
  async getApplicationList(@User() user: any, @Query() query: { page?: number; limit?: number; status?: string }) {
    return await this.applicationUseCase.getApplicationList(user, query);
  }

  @Put('/:id')
  async updateApplication(@User() user: any, @Body() body: UpdateApplicationDto, @Param('id') applicationId: number) {
    return await this.applicationUseCase.update(user, applicationId, body);
  }

  @Put('/risk-decision/:id')
  async updateRiskDecision(@User() user: any, @Body() body: { status: RiskDecision }, @Param('id') applicationId: number) {
    return await this.applicationUseCase.updateRiskDecision(user, applicationId, body);
  }

  @Put('/risk-dicision/:id')
  async updateRiskDecisionWithLegacyPath(@User() user: any, @Body() body: { status: string }, @Param('id') applicationId: number) {
    return await this.applicationUseCase.updateRiskDecision(user, applicationId, body);
  }
}
