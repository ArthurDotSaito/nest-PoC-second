import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DatabaseMigration1691174903003 } from './migrations/1691174903003-databaseMigration';
config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: 'nestpoc_typeorm',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
      });
      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: 'nestpoc_typeorm',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [DatabaseMigration1691174903003],
});
