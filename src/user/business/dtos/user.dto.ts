interface RoleDTO {
  roleId?: number;
  roleName: string;
  roleCode: string;
}

interface UserDTO {
  userId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  role: RoleDTO[];
}
