import { Controller, Get } from '@nestjs/common';
import { User } from 'src/middlewares/user.decorator';
import { UserUseCase } from 'src/user/application/usecases/user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('/profile')
  async getProfile(@User() user: any) {
    return await this.userUseCase.getProfile(user?.userId);
  }
}
