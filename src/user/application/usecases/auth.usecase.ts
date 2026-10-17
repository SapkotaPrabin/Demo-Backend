import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseData } from 'libs/utils/response.utils';
import type { ResponseType } from 'libs/utils/response.utils';
import { IUserRepository } from 'src/user/business/repositories/user.repository';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(authVerifyPasswordDTO: AuthVerifyPasswordDTO): Promise<ResponseType> {
    try {
      const { contactNumber, password } = authVerifyPasswordDTO;
      if (!contactNumber || !password) {
        throw new HttpException(
          {
            ...ResponseData('Data not valid', null, false, {
              message: 'Contact number and password are required',
            }),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const userData = await this.userRepository.findOneBy({ contactNumber });
      if (!userData) {
        throw new HttpException(
          {
            ...ResponseData('User not found', null, false, {
              message: 'No user found with the provided contact number',
            }),
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const isPasswordValid = await userData.verifyPassword(password);
      if (!isPasswordValid) {
        throw new HttpException(
          {
            ...ResponseData('Invalid credentials', null, false, {
              message: 'The provided contact number or password is incorrect',
            }),
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return ResponseData('Login Successfully', await this.tokenService.generateLoginToken(userData), true, null);
    } catch (error) {
      console.log('Error at login:', error);
      throw error;
    }
  }

  async getLoggedInUser(userId: number): Promise<any> {
    try {
      console.log('AuthUseCase getLoggedInUser called with userId:', userId);
      return { userId, name: 'Demo User' };
    } catch (error) {
      console.log('Error at getLoggedInUser:', error);
      throw error;
    }
  }
}
