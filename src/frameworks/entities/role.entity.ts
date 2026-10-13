import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'role_name' })
  roleName: string;

  @Column({ name: 'role_code' })
  roleCode: string;

  @CreateDateColumn()
  created_at?: Date;
}
