require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Author } from 'src/authors/author.entity';
import { Book } from 'src/books/book.entity';
import databaseConfigSchema from 'src/utils/joi/database-config.schema';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  synchronize: true,
  entities: [User, Author, Book],
  migrations: ['dist/database/migrations/*.js'],
};

const { error } = databaseConfigSchema.validate(dataSourceOptions);

if (error) throw new Error(`Invalid database configuration: ${error.message}`);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
