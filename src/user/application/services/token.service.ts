import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateLoginToken(user: any): Promise<any> {
    const accessToken = this.jwtService.sign(
      {
        sub: user.userId,
        exp: Math.floor(Date.now()) + 20 * 60 * 1000,
        iss: process.env.ISS,
        aud: process.env.AUD,
      },
      {
        privateKey: process.env.JWT_PRIVATE_KEY,
      },
    );

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
