import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the author' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Author biography', description: 'The biography of the author' })
  @IsString()
  @IsOptional()
  biography?: string;

  @ApiProperty({ example: '2000-01-01', description: 'The birth date of the author' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;
}