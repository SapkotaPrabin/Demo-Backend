import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUseCase {
  constructor(

  ) {}

    async getLoggedInUser(userId: number): Promise<any> {
    try {
    } catch (error) {
      console.log('Error at getLoggedInUser:', error);
      throw error;
    }
  }
}