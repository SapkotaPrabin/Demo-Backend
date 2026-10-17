import { Body, Controller, Post } from '@nestjs/common';
import { AuthUseCase } from '../../application/usecases/auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthUseCase: AuthUseCase) {}

  @Post('/login')
  async login(@Body() authVerifyPasswordDTO: AuthVerifyPasswordDTO) {
    return await this.AuthUseCase.login(authVerifyPasswordDTO);
  }
}
