import * as dotenv from 'dotenv';

dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';

import { dbConfig  } from './src/db/db-config';

const db = dbConfig() as DataSourceOptions;

const dataSource = new DataSource(db);

export default dataSource;
