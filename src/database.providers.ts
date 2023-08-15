import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { CoursesNestDBTypeORM1692058068337 } from './migrations/1692058068337-CoursesNestDB-typeORM';
import { CreateTagsTable1692058535964 } from './migrations/1692058535964-createTagsTable';
import { CreateCoursesTagsTable1692070900261 } from './migrations/1692070900261-createCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1692071678850 } from './migrations/1692071678850-addTagsIdToCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1692071178505 } from './migrations/1692071178505-addCoursesIdToCoursesTagsTable';
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
  migrations: [
    CoursesNestDBTypeORM1692058068337,
    CreateTagsTable1692058535964,
    CreateCoursesTagsTable1692070900261,
    AddCoursesIdToCoursesTagsTable1692071178505,
    AddTagsIdToCoursesTagsTable1692071678850,
  ],
});
