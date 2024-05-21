import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the author' })
  name: string;

  @ApiProperty({ example: 'Author biography', description: 'The biography of the author' })
  biography: string;

  @ApiProperty({ example: '1990-01-01', description: 'The birth date of the author' })
  dateOfBirth: string;
}