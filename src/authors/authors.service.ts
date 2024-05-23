import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    try {
      return await this.authorsRepository.save(author);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, updateAuthorDto);
    try {
      return await this.authorsRepository.save(author);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }
}
