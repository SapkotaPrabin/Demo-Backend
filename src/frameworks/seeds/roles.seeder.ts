import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { roleCodes } from 'libs/utils/constants.utils';
import { typeOrmConfigs } from '../config/database.config';

export class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const roles = [
      {
        roleName: 'Admin',
        roleCode: roleCodes.ADMIN,
      },
      {
        roleName: 'Reviewer',
        roleCode: roleCodes.REVIEWER,
      },
      {
        roleName: 'Sales',
        roleCode: roleCodes.SALES,
      },
    ];

    const roleRepository = dataSource.getRepository(Role);

    for (const role of roles) {
      const existingRole = await roleRepository.findOne({
        where: { roleCode: role.roleCode },
      });

      if (!existingRole) {
        await roleRepository.save(roleRepository.create(role));
      } else if (existingRole.roleName !== role.roleName) {
        await roleRepository.update(existingRole.roleId, {
          roleName: role.roleName,
        });
      }
    }
    console.log('✓ Roles seeded successfully');
  }
}

async function runRoleSeeder(): Promise<void> {
  const dataSource = new DataSource(typeOrmConfigs);

  try {
    await dataSource.initialize();
    console.log('✓ Data Source initialized for seeding');

    const seeder = new RoleSeeder();
    await seeder.run(dataSource);
  } catch (error) {
    console.error('✗ Error during role seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('✓ Data Source destroyed after seeding');
    }
  }
}

runRoleSeeder();
