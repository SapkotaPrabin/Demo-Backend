import { User } from 'src/user/business/entities/user.entity';
import { roleCodes } from './constants.utils';

export const isAdmin = async (user: User): Promise<boolean> => {
  const roles = user?.role || [];
  return roles.some((role) => role.roleCode === roleCodes.ADMIN);
};
