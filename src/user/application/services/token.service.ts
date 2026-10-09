import { Injectable } from '@nestjs/common';
import { ITokenService } from '../application/services/token.service';
import { TokenResponseDTO } from '../business/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../business/entities/user.entity';
import { UserFromTokenResponseDTO } from '../business/dtos/user.dto';
import { accountStatus } from '../utils/constants.utils';
import { tokenScopes } from '../utils/constants.utils';
import { roleCodes } from 'libs/utils/constants.utils';

@Injectable()
export class TokenService extends ITokenService {
  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async generateLoginToken(user: User, refreshToken?: string): Promise<TokenResponseDTO> {
    const permissions = [tokenScopes.ID, tokenScopes.ACCOUNT];
    if (user.accountStatus === accountStatus.ACTIVE) {
      permissions.push(tokenScopes.PROFILE);
      if (Array.isArray(user.permissions) && user.permissions.length > 0) {
        const roles = user.permissions.map((scope) => scope.split(':')[0]).filter((role, index, self) => self.indexOf(role) === index);
        permissions.push(...roles);
      }
    }
    if (user.accountStatus !== accountStatus.SIGN_UP && user.accountStatus !== accountStatus.CREATED) {
      permissions.push(tokenScopes.REFRESH);
    }

    const userRoles = user?.roles;
    const isDriver = userRoles?.some((role) => role.roleCode.includes(roleCodes.DRIVER));

    // Generate new tokens
    const accessToken = this.jwtService.sign(
      {
        sub: user.userId,
        permissions: user.permissions,
        exp: Math.floor(Date.now()) + 20 * 60 * 1000,
        iss: process.env.ISS,
        aud: process.env.AUD,
      },
      {
        privateKey: process.env.JWT_PRIVATE_KEY,
      },
    );
    // Generate new tokens
    const newRefreshToken = this.jwtService.sign(
      {
        sub: user.userId,
        permissions: user.permissions,
        exp: Math.floor(Date.now()) + 30 * 24 * 60 * 60 * 1000,
        iss: process.env.ISS,
        aud: process.env.AUD,
      },
      {
        privateKey: process.env.JWT_PRIVATE_KEY,
      },
    );
    if (isDriver) {
      await this.driverRepository.setTokens(user.userId, accessToken, !!refreshToken ? refreshToken : newRefreshToken);
    }

    return {
      accessToken,
      refreshToken: !!refreshToken ? refreshToken : newRefreshToken,
      idToken: this.jwtService.sign(
        {
          name: `${user.firstName}`,
          sub: user.userId,
          user: {
            userId: user.userId,
            name: `${user.firstName} ${user.lastName}`,
            roles: user.roles,
            permissions: user.permissions,
          },
          iss: process.env.ISS,
          aud: process.env.AUD,
        },
        {
          privateKey: process.env.JWT_PRIVATE_KEY,
        },
      ),
      tokenType: 'Bearer',
    };
  }

  decode(token: string): UserFromTokenResponseDTO {
    return this.jwtService.decode(token);
  }
}
