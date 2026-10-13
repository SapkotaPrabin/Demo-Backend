import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { roleCodes } from 'libs/utils/constants.utils';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export class SuperAdminSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    try {
      const userRepository = dataSource.getRepository(User);
      const roleRepository = dataSource.getRepository(Role);
      const existingRole = await roleRepository.findOne({
        where: { roleCode: roleCodes.ADMIN },
      });

      const existingContactNumber = await userRepository.findOne({
        where: { contactNumber: '1234567890' },
      });

      if (!existingContactNumber) {
        const existingSuperAdmin = await userRepository.findOne({
          where: { role: { roleId: existingRole.roleId } },
        });

        if (!existingSuperAdmin) {
          const user = {
            firstName: 'System',
            lastName: 'Admin',
            contactNumber: '1234567890',
            email: 'support@demo.com',
          };
          const superAdmin = await userRepository.insert(user);
          const encryptPassword = await bcrypt.hash('DemoUser@#123', 10);
          const verificationCode = new VerificationCode().create();
          const userAuth = {
            userId: superAdmin.identifiers[0].userId,
            password: encryptPassword,
            verificationCode: verificationCode.value,
            verificationCodeExpiresAt: verificationCode.expiresAt,
            verificationCodeCreatedOn: verificationCode.createdOn,
          };
          await userAuthRepository.insert(userAuth);
          await userRepository.createQueryBuilder().relation(User, 'roles').of(superAdmin.identifiers[0].userId).add(existingRole);
          console.log('✓ Super Admin seeded successfully.');
        } else {
          console.log('✓ Super admin account already exist');
        }
      } else {
        console.log("✓ Super admin's contact number already exist");
      }
    } catch (error) {
      console.error('Error while seeding super admin:', error);
    }
  }
}

async function runSeeder() {
  const dataSource = new DataSource(typeOrmConfigs);

  try {
    await dataSource.initialize();
    console.log('✓ Data Source initialized for seeding');

    const seeder = new SuperAdminSeeder();
    await seeder.run(dataSource);
  } catch (error) {
    console.error('✗ Error during seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('✓ Data Source destroyed after seeding');
    }
  }
}

// Execute the seeder
runSeeder();
