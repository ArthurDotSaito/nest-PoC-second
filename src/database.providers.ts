import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
