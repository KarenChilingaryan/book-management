import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = { title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), authorId: 1 };
      const savedBook = { id: 1, ...createBookDto };

      mockBooksService.create.mockResolvedValue(savedBook);
      expect(await controller.create(createBookDto)).toEqual(savedBook);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [{ id: 1, title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), author: { id: 1 } }];
      mockBooksService.findAll.mockResolvedValue(books);

      expect(await controller.findAll()).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const book = { id: 1, title: 'The Great Book', isbn: '123-456-789', publishedDate: new Date(), author: { id: 1 } };
      mockBooksService.findOne.mockResolvedValue(book);

      expect(await controller.findOne('1')).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title', isbn: '987-654-321', publishedDate: new Date(), authorId: 1 };
      const updatedBook = { id: 1, ...updateBookDto };

      mockBooksService.update.mockResolvedValue(updatedBook);
      expect(await controller.update('1', updateBookDto)).toEqual(updatedBook);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      mockBooksService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});
