import * as path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '../config.service';

const baseDir = path.join(__dirname, '../../');
const service = new ConfigService();
const config = service.getTypeORMConfig();

export const defaultConfig: PostgresConnectionOptions = {
  ...config,
  synchronize: false,
  entities: [baseDir + '/**/*.entity.{js,ts}'],
  migrations: [],
};

export default new DataSource({
  ...defaultConfig,
  migrations: ['src/migrations/*.ts'],
});
