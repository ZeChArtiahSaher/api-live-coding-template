import { Event } from '../entities/event';
import { DataSourceOptions } from "typeorm";

export const dbConfig = () => {
  const env = process.env;

  return {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    autoLoadEntities: true,
    migrationsTableName: 'test_project_migrations',
    entities: [Event],
    migrations: ['dist/src/migrations/**/*{.ts,.js}'],
    maxQueryExecutionTime: 5000,
    connectTimeoutMS: 5000,
    ssl: true,
    logging: false,
  } as DataSourceOptions;
};