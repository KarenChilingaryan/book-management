import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  const mockAuthorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = { name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() };
      const savedAuthor = { id: 1, ...createAuthorDto };

      mockAuthorsService.create.mockResolvedValue(savedAuthor);
      expect(await controller.create(createAuthorDto)).toEqual(savedAuthor);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors = [{ id: 1, name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() }];
      mockAuthorsService.findAll.mockResolvedValue(authors);

      expect(await controller.findAll()).toEqual(authors);
    });
  });

  describe('findOne', () => {
    it('should return an author by id', async () => {
      const author = { id: 1, name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() };
      mockAuthorsService.findOne.mockResolvedValue(author);

      expect(await controller.findOne('1')).toEqual(author);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = { name: 'John Doe Updated', biography: 'Updated biography' };
      const updatedAuthor = { id: 1, ...updateAuthorDto };

      mockAuthorsService.update.mockResolvedValue(updatedAuthor);
      expect(await controller.update('1', updateAuthorDto)).toEqual(updatedAuthor);
    });
  });

  describe('remove', () => {
    it('should delete an author', async () => {
      mockAuthorsService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});
