import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the author' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Author biography', description: 'The biography of the author' })
  @IsString()
  @IsOptional()
  biography: string;

  @ApiProperty({ example: '2000-01-01', description: 'The birth date of the author' })
  @IsDate()
  @IsOptional()
  dateOfBirth: Date;
}