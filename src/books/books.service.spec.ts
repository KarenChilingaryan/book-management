import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

const mockBookRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('BooksService', () => {
  let service: BooksService;
  let repository: ReturnType<typeof mockBookRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useFactory: mockBookRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert a book', async () => {
      const bookDto: CreateBookDto = { title: 'Test Book', isbn: '1234567890', publishedDate: new Date().toISOString(), authorId: 1 };
      const book = { ...bookDto, id: 1 };
      repository.create.mockReturnValue(book);
      repository.save.mockResolvedValue(book);

      const result = await service.create(bookDto);
      expect(result).toEqual(book);
      expect(repository.create).toHaveBeenCalledWith(bookDto);
      expect(repository.save).toHaveBeenCalledWith(book);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const book = { title: 'Test Book', isbn: '1234567890', publishedDate: new Date().toISOString(), authorId: 1 };
      repository.find.mockResolvedValue([book]);

      const result = await service.findAll();
      expect(result).toEqual([book]);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['author'] });
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const book: CreateBookDto = { title: 'Test Book', isbn: '1234567890', publishedDate: new Date().toISOString(), authorId: 1 };
      repository.findOne.mockResolvedValue(book);

      const result = await service.findOne(1);
      expect(result).toEqual(book);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['author'] });
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookDto = { title: 'Updated Test Book' };
      const book = { ...bookDto, id: 1 } as Book;
      repository.update.mockResolvedValue(book);
      repository.findOne.mockResolvedValue(book);

      const result = await service.update(1, bookDto);
      expect(result).toEqual(book);
      expect(repository.update).toHaveBeenCalledWith(1, bookDto);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      repository.delete.mockResolvedValue({});
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
