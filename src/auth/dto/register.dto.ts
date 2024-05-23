import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'strongpassword123', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
