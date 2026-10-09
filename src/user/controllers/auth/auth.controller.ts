import { Body, Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
  constructor(

  ) {}
  @Post('/vehicle-owner-signup')
  async vehicleOwnerSignUp(@Body() vehicleOwnerCreateDTO: VehicleOwnerCreateDTO) {
    return await this.VehicleOwnerUseCase.createVehicleOwner(vehicleOwnerCreateDTO, false, 'LODBOD');
  }

  @Post('/verify-code')
  async verifyCode(@Body() authVerifyCodeDTO: AuthVerifyCodeDTO, @Req() req: any) {
    return await this.AuthUseCase.verifyCode(authVerifyCodeDTO, req?.raw?.['logIdentifier']);
  }

  @Post('/login')
  async login(@Body() authVerifyPasswordDTO: AuthVerifyPasswordDTO, @Req() req: any) {
    return await this.AuthUseCase.login(authVerifyPasswordDTO, req?.raw?.['logIdentifier']);
  }
}