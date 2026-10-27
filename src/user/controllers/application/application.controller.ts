import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../../../middlewares/user.decorator';
import { ApplicationStatus } from '../../utils/constants.utils';
import { ApplicationDecisionDto, AssignReviewerDto, CreateApplicationDto, UpdateApplicationDto } from '../../business/dtos/application.dto';
import { ApplicationUseCase } from 'src/user/application/usecases/application.usecase';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationUseCase: ApplicationUseCase) {}

  @Post('')
  create(@User() user: any, @Body() body: CreateApplicationDto) {
    return this.applicationUseCase.create(user, body);
  }
}
