import { DataSource } from 'typeorm';
import { typeOrmConfigs } from './config/database.config';
const AppDataSource = new DataSource(typeOrmConfigs);
export default AppDataSource;
