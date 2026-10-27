import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';

export class User {
  userId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  contactNumber: string;
  email?: string;
  password: string;
  role: Role[];

  constructor(userDTO: UserDTO) {
    if (userDTO.userId) {
      this.userId = userDTO.userId;
    }
    this.firstName = userDTO.firstName;
    if (userDTO.middleName) {
      this.middleName = userDTO.middleName;
    }
    this.lastName = userDTO.lastName;
    this.contactNumber = userDTO.contactNumber;
    this.email = userDTO.email;
    this.password = userDTO.password;
    this.role = userDTO.role;
  }

  async verifyPassword(password: string) {
    if (!!this.password && !!password) {
      return bcrypt.compare(password, this.password);
    }
    return false;
  }
}
