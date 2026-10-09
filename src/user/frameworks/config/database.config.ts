import { DataSourceOptions } from 'typeorm';
export const typeOrmConfigs: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(process.env.DATABASE_PORT),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [
  ],
  migrations: [
    join(__dirname, '../frameworks/database/migrations/*{.ts,.js}'),
  ],
  synchronize: false,
  logging: true,
  logger: false,
  maxQueryExecutionTime: 1,
  extra: {
    max: 3,
  },
};