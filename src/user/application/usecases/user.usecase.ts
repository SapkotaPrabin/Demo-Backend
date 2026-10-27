import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { roleCodes } from 'libs/utils/constants.utils';
import { ResponseData } from 'libs/utils/response.utils';
import { IUserRepository } from 'src/user/business/repositories/user.repository';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async getProfile(userId: number): Promise<any> {
    try {
      const userData = await this.userRepository.get(userId);
      if (!userData) {
        throw new HttpException(
          {
            ...ResponseData('User not found', null, false, {
              message: 'No user found with the provided ID',
            }),
          },
          HttpStatus.NOT_FOUND,
        );
      }
      delete userData.password;
      return ResponseData('User profile fetched successfully', userData, true, null);
    } catch (error) {
      console.log('Error at getProfile:', error);
      throw error;
    }
  }

  async listUser(roleCode: string, query?: { page?: number; limit?: number }) {
    try {
      if (![roleCodes.ADMIN, roleCodes.REVIEWER, roleCodes.SALES]?.includes(roleCode)) {
        throw new HttpException(
          {
            ...ResponseData('Data not valid', null, false, {
              roleCode: 'Role code is not valid',
            }),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const [users, count] = await this.userRepository.getUserList(roleCode, query);
      return ResponseData('User list fetched successfully', { users, count }, true, null);
    } catch (error) {
      console.log('Error while fetching user list', error);
      throw error;
    }
  }
}
