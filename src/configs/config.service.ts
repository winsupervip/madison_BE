import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface IEnvConfigInterface {
  DATABASE_DATABASE: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;

  ENV: 'production' | 'testing' | 'development';
  HOST: string;
}

const filePath = join(__dirname, '..', '..', '.env');

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfigInterface;
  private static _INSTANCE: ConfigService;
  static get Instance() {
    if (!this._INSTANCE) {
      this._INSTANCE = new ConfigService();
    }
    return this._INSTANCE;
  }

  constructor(pFilePath = filePath) {
    const config = dotenv.parse(fs.readFileSync(pFilePath));
    this.envConfig = this.validateInput(config as any as IEnvConfigInterface);
  }

  public get(name: keyof IEnvConfigInterface) {
    return this.envConfig[name];
  }
  public get env() {
    return this.envConfig;
  }

  public getTypeORMConfig(): PostgresConnectionOptions {
    const baseDir = path.join(__dirname, '../');
    return {
      type: 'postgres',
      host: this.envConfig.DATABASE_HOST,
      username: this.envConfig.DATABASE_USER,
      password: this.envConfig.DATABASE_PASSWORD,
      database: this.envConfig.DATABASE_DATABASE,
      port: Number.parseInt(this.envConfig.DATABASE_PORT, 10),
      logging: false,
      entities: [baseDir + '/**/*.entity.{js,ts}'],
      subscribers: [__dirname + '../../**/*.subscriber.js'],
      migrations: ['src/migrations/*.ts'],
    };
  }

  /*
	  Ensures all needed variables are set, and returns the validated JavaScript object
	  including the applied default values.
  */
  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      ENV: Joi.string()
        .valid('production', 'testing', 'development')
        .default('development'),
      DATABASE_DATABASE: Joi.string().default('myapp_db'),
      DATABASE_HOST: Joi.string().default('34.126.103.20'),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_PORT: Joi.number().default(5432),

      HOST: Joi.string().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
