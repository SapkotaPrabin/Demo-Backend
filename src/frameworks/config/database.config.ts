import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { MerchantApplication } from '../entities/merchant_application.entity';
import { AuditLog } from '../entities/audit-log.entity';

const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const port = Number(requiredEnv('DATABASE_PORT'));
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DATABASE_PORT must be a valid TCP port');
}

const configDirectory =
  typeof __dirname === 'undefined'
    ? join(process.cwd(), 'src/frameworks/config')
    : __dirname;

export const typeOrmConfigs: DataSourceOptions = {
  type: 'postgres',
  host: requiredEnv('DATABASE_HOST'),
  port,
  username: requiredEnv('DATABASE_USERNAME'),
  password: requiredEnv('DATABASE_PASSWORD'),
  database: requiredEnv('DATABASE_NAME'),
  entities: [
    User,
    Role,
    MerchantApplication,
    AuditLog,
  ],
  migrations: [join(configDirectory, '../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true,
  maxQueryExecutionTime: 1,
  extra: {
    max: 3,
  },
};
