import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('authors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Return all authors.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiResponse({ status: 200, description: 'Return the author with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the author' })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
