import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { dataSourceOptions } from '../database/ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    BooksModule,
    AuthorsModule,
    AuthModule,
  ],
})
export class AppModule { }
