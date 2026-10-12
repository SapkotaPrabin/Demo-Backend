import { Injectable } from '@nestjs/common';
// import { ITokenService } from '../application/services/token.service';
// import { TokenResponseDTO } from '../business/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
// import { User } from '../business/entities/user.entity';
// import { UserFromTokenResponseDTO } from '../business/dtos/user.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService
  ) {
    // super();
  }

  async generateLoginToken(user: any, refreshToken?: string): Promise<any> {
    // const userRoles = user?.roles;
    // // Generate new tokens
    // const accessToken = this.jwtService.sign(
    //   {
    //     sub: user.userId,
    //     permissions: user.permissions,
    //     exp: Math.floor(Date.now()) + 20 * 60 * 1000,
    //     iss: process.env.ISS,
    //     aud: process.env.AUD,
    //   },
    //   {
    //     privateKey: process.env.JWT_PRIVATE_KEY,
    //   },
    // );
    // // Generate new tokens
    // const newRefreshToken = this.jwtService.sign(
    //   {
    //     sub: user.userId,
    //     permissions: user.permissions,
    //     exp: Math.floor(Date.now()) + 30 * 24 * 60 * 60 * 1000,
    //     iss: process.env.ISS,
    //     aud: process.env.AUD,
    //   },
    //   {
    //     privateKey: process.env.JWT_PRIVATE_KEY,
    //   },
    // );

    // return {
    //   accessToken,
    //   refreshToken: !!refreshToken ? refreshToken : newRefreshToken,
    //   idToken: this.jwtService.sign(
    //     {
    //       name: `${user.firstName}`,
    //       sub: user.userId,
    //       user: {
    //         userId: user.userId,
    //         name: `${user.firstName} ${user.lastName}`,
    //         roles: user.roles,
    //         permissions: user.permissions,
    //       },
    //       iss: process.env.ISS,
    //       aud: process.env.AUD,
    //     },
    //     {
    //       privateKey: process.env.JWT_PRIVATE_KEY,
    //     },
    //   ),
    //   tokenType: 'Bearer',
    // };
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
