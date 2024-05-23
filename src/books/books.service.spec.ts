import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

const mockBookRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockAuthorsService = {
  findOne: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;
  let repository: ReturnType<typeof mockBookRepository>;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useFactory: mockBookRepository,
        },
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get(getRepositoryToken(Book));
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto = { title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), authorId: 1 };
      const savedBook = { id: 1, ...createBookDto, author: { id: 1 } };

      mockAuthorsService.findOne.mockResolvedValue({ id: 1 });
      repository.create.mockReturnValue(savedBook);
      repository.save.mockResolvedValue(savedBook);

      expect(await service.create(createBookDto)).toEqual(savedBook);
    });

    it('should throw a BadRequestException on error', async () => {
      const createBookDto = { title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), authorId: 1 };
      mockAuthorsService.findOne.mockResolvedValue({ id: 1 });
      repository.create.mockReturnValue(createBookDto);
      repository.save.mockRejectedValue(new Error());

      await expect(service.create(createBookDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if author is not found', async () => {
      const createBookDto = { title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), authorId: 1 };
      mockAuthorsService.findOne.mockResolvedValue(null);

      await expect(service.create(createBookDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [{ id: 1, title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), author: { id: 1 } }];
      repository.find.mockResolvedValue(books);

      expect(await service.findAll()).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const book = { id: 1, title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), author: { id: 1 } };
      repository.findOne.mockResolvedValue(book);

      expect(await service.findOne(1)).toEqual(book);
    });

    it('should throw a NotFoundException if book is not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto = { title: 'Updated Title', isbn: '987-654-321', publishedDate: new Date(), authorId: 1 };
      const updatedBook = { id: 1, ...updateBookDto, author: { id: 1 } };

      repository.findOne.mockResolvedValue(updatedBook);
      mockAuthorsService.findOne.mockResolvedValue({ id: 1 });
      repository.save.mockResolvedValue(updatedBook);

      expect(await service.update(1, updateBookDto)).toEqual(updatedBook);
    });

    it('should throw a NotFoundException if author is not found', async () => {
      const updateBookDto = { title: 'Updated Title', isbn: '987-654-321', publishedDate: new Date(), authorId: 1 };

      repository.findOne.mockResolvedValue(updateBookDto);
      mockAuthorsService.findOne.mockResolvedValue(null);

      await expect(service.update(1, updateBookDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw a BadRequestException on error', async () => {
      const updateBookDto = { title: 'Updated Title', isbn: '987-654-321', publishedDate: new Date(), authorId: 1 };

      repository.findOne.mockResolvedValue(updateBookDto);
      mockAuthorsService.findOne.mockResolvedValue({ id: 1 });
      repository.save.mockRejectedValue(new Error());

      await expect(service.update(1, updateBookDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if book is not found', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
