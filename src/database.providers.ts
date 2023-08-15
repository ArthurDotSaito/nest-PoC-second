import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { CoursesNestDBTypeORM1692058068337 } from './migrations/1692058068337-CoursesNestDB-typeORM';
import { CreateTagsTable1692058535964 } from './migrations/1692058535964-createTagsTable';
config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'nest_poc_db',
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
  username: 'postgres',
  password: 'docker',
  database: 'nest_poc_db',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [CoursesNestDBTypeORM1692058068337, CreateTagsTable1692058535964],
});
