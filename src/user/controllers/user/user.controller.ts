import { Controller, Get, Query } from '@nestjs/common';
import { roleCodes } from 'libs/utils/constants.utils';
import { User } from 'src/middlewares/user.decorator';
import { UserUseCase } from 'src/user/application/usecases/user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('/profile')
  async getProfile(@User() user: any) {
    return await this.userUseCase.getProfile(user?.userId);
  }

  @Get('/sales')
  async listSalesUser(@Query() query: { page?: number; limit?: number }) {
    return await this.userUseCase.listUser(roleCodes.SALES, query);
  }

  @Get('/reviewer')
  async listReviewerUser(@Query() query: { page?: number; limit?: number }) {
    return await this.userUseCase.listUser(roleCodes.REVIEWER, query);
  }
}
