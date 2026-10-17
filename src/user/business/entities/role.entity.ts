export class Role {
  roleId?: number;
  roleName: string;
  roleCode: string;

  constructor(roleDTO: RoleDTO) {
    if (roleDTO.roleId) {
      this.roleId = roleDTO.roleId;
    }
    this.roleName = roleDTO.roleName;
    this.roleCode = roleDTO.roleCode;
  }
}
