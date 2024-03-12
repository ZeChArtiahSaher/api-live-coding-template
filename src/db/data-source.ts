import { DataSource } from 'typeorm'

import { dbConfig } from './db-config';

const config = dbConfig()

const dataSource = new DataSource(config as any)

export default dataSource;
