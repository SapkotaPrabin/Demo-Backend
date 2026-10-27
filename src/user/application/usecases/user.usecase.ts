import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
}
