import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Book', description: 'The title of the book' })
  title: string;

  @ApiProperty({ example: '123-456-789', description: 'The ISBN of the book' })
  isbn: string;

  @ApiProperty({ example: '2023-01-01', description: 'The published date of the book' })
  publishedDate: string;

  @ApiProperty({ example: 1, description: 'The ID of the author' })
  authorId: number;
}