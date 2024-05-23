import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Book', description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '123-456-789', description: 'The ISBN of the book' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ example: new Date(), description: 'The published date of the book' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publishedDate: Date;

  @ApiProperty({ example: 1, description: 'The ID of the author' })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
