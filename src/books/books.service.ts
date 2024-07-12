import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private authorsService: AuthorsService,
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorsService.findOne(createBookDto.authorId);
    if (!author) {
      throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
    }
    const book = this.booksRepository.create({ ...createBookDto, author });
    try {
      return await this.booksRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    if (updateBookDto.authorId) {
      const author = await this.authorsService.findOne(updateBookDto.authorId);
      if (!author) {
        throw new NotFoundException(`Author with ID ${updateBookDto.authorId} not found`);
      }
      book.author = author;
    }
    Object.assign(book, updateBookDto);
    try {
      return await this.booksRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
