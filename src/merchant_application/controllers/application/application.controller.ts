import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../../middlewares/user.decorator';
import { CreateApplicationDto } from '../../business/dtos/application.dto';
import { ApplicationUseCase } from 'src/merchant_application/application/usecases/application.usecase';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationUseCase: ApplicationUseCase) {}

  @Post('')
  create(@User() user: any, @Body() body: CreateApplicationDto) {
    return this.applicationUseCase.create(user, body);
  }
}
