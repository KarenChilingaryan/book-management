import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the author' })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The name of the author' })
  name: string;

  @Column('text')
  @ApiProperty({ example: 'Author biography', description: 'The biography of the author' })
  biography: string;

  @Column()
  @ApiProperty({ example: '2000-01-01', description: 'The birth date of the author' })
  dateOfBirth: Date;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books: Book[];
}
