import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUseCase } from '../../application/usecases/auth.usecase';
import { User } from 'src/middlewares/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthUseCase: AuthUseCase) {}

  @Post('/login')
  async login(@Body() authVerifyPasswordDTO: AuthVerifyPasswordDTO) {
    return await this.AuthUseCase.login(authVerifyPasswordDTO);
  }

  @Get('/profile')
  async getProfile(@User() user: any) {
    return await this.AuthUseCase.getProfile(user?.userId);
  }
}
