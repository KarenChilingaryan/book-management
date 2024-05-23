import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';


export class UpdateBookDto {
    @ApiProperty({ example: 'The Great Book', description: 'The title of the book' })
    @IsString()
    @IsOptional()
    title?: string;
  
    @ApiProperty({ example: '123-456-789', description: 'The ISBN of the book' })
    @IsString()
    @IsOptional()
    isbn?: string;
  
    @ApiProperty({ example: new Date(), description: 'The published date of the book' })
    @IsDate()
    @IsOptional()
    publishedDate?: Date;
  
    @ApiProperty({ example: 1, description: 'The ID of the author' })
    @IsNumber()
    @IsOptional()
    authorId?: number;
  }