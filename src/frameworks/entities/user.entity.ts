import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'contact_number', nullable: true })
  contactNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'roleId',
    },
  })
  role: Role;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
