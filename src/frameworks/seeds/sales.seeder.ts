import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { roleCodes } from 'libs/utils/constants.utils';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { typeOrmConfigs } from '../config/database.config';

export class SalesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    try {
      const salesUserDetail = [
        {
          firstName: 'Sales',
          lastName: 'User1',
          contactNumber: '1200000000',
          email: 'sales1@demo.com',
          password: await bcrypt.hash('Sales1User@#123', 10),
        },
        {
          firstName: 'Sales',
          lastName: 'User2',
          contactNumber: '1200000001',
          email: 'sales2@demo.com',
          password: await bcrypt.hash('Sales2User@#123', 10),
        },
        {
          firstName: 'Sales',
          lastName: 'User3',
          contactNumber: '1200000002',
          email: 'sales3@demo.com',
          password: await bcrypt.hash('Sales3User@#123', 10),
        },
      ];
      const userRepository = dataSource.getRepository(User);
      const roleRepository = dataSource.getRepository(Role);
      const existingRole = await roleRepository.findOne({
        where: { roleCode: roleCodes.SALES },
      });

      for (const userDetail of salesUserDetail) {
        const existingContactNumber = await userRepository.findOne({
          where: { contactNumber: userDetail.contactNumber },
        });

        if (!existingContactNumber) {
          const salesUser = await userRepository.insert(userDetail);
          await userRepository.createQueryBuilder().relation(User, 'role').of(salesUser.identifiers[0].userId).add(existingRole);
          console.log(`✓ Sales User ${userDetail.firstName} seeded successfully.`);
        } else {
          console.log(`✓ Sales User ${userDetail.firstName}'s contact number already exist`);
        }
      }
    } catch (error) {
      console.error('Error while seeding sales users:', error);
    }
  }
}

async function runSeeder() {
  const dataSource = new DataSource(typeOrmConfigs);
  try {
    await dataSource.initialize();
    console.log('✓ Data Source initialized for seeding');

    const seeder = new SalesSeeder();
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
