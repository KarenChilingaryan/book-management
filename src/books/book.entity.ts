import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from '../authors/author.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the book' })
  id: number;

  @Column()
  @ApiProperty({ example: 'The Great Book', description: 'The title of the book' })
  title: string;

  @Column()
  @ApiProperty({ example: '123-456-789', description: 'The ISBN of the book' })
  isbn: string;

  @Column()
  @ApiProperty({ example: '2023-01-01', description: 'The published date of the book' })
  publishedDate: string;

  @ManyToOne(() => Author, (author) => author.books)
  @ApiProperty({ type: () => Author, description: 'The author of the book' })
  author: Author;
}