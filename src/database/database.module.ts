import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
