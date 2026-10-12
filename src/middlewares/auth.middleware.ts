import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { TokenType } from '../routes/types';
import { AuthUseCase } from 'src/user/application/usecases/auth.usecase';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('ROUTES') private readonly routes: any,
    private readonly authUseCase: AuthUseCase
  ) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    let formattedUrl: string;
    formattedUrl = request.originalUrl.replace(/\?.*$/, '');
    // If the URL matches the pattern with path parameters and optional query parameters
    if (/^\/[\w\-]+\/\d+/.test(request.originalUrl)) {
      formattedUrl = formattedUrl.replace(/\/\d+/, '/:id');
    }
    const route = this.routes[formattedUrl];
    if (!!route && !!route.auth) {
      const token = (request.headers.authorization && request.headers.authorization.replace('Bearer ', '')) || null;
      const decodedToken: TokenType = new JwtService({
        privateKey: process.env.JWT_PRIVATE_KEY,
      }).decode(token) as TokenType;
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid Bearer Token');
      }
      request['permissions'] = decodedToken['permissions'] || [];
      if (!decodedToken || !decodedToken.sub) {
        throw new UnauthorizedException('Unauthorized Request');
      }

      if (decodedToken.exp < Date.now()) {
        throw new UnauthorizedException('Token validity has been expired');
      }
      //fetch from cache
      const cachedValue = await this.authUseCase.getLoggedInUser(decodedToken?.['sub']);
      if (cachedValue) {
        request['user'] = cachedValue;
      }
    }
    console.log('Full URL:', request.originalUrl);
    next();
  }
}
