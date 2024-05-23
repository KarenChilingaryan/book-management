import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockAuthorRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: ReturnType<typeof mockAuthorRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useFactory: mockAuthorRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto = { name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() };
      const savedAuthor = { id: 1, ...createAuthorDto };

      repository.create.mockReturnValue(savedAuthor);
      repository.save.mockResolvedValue(savedAuthor);

      expect(await service.create(createAuthorDto)).toEqual(savedAuthor);
    });

    it('should throw a BadRequestException on error', async () => {
      const createAuthorDto = { name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() };
      repository.create.mockReturnValue(createAuthorDto);
      repository.save.mockRejectedValue(new Error());

      await expect(service.create(createAuthorDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors = [{ id: 1, name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() }];
      repository.find.mockResolvedValue(authors);

      expect(await service.findAll()).toEqual(authors);
    });
  });

  describe('findOne', () => {
    it('should return an author by id', async () => {
      const author = { id: 1, name: 'John Doe', biography: 'Author biography', dateOfBirth: new Date() };
      repository.findOne.mockResolvedValue(author);

      expect(await service.findOne(1)).toEqual(author);
    });

    it('should throw a NotFoundException if author is not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto = { name: 'John Doe Updated', biography: 'Updated biography' };
      const updatedAuthor = { id: 1, ...updateAuthorDto };
      repository.findOne.mockResolvedValue(updatedAuthor);
      repository.save.mockResolvedValue(updatedAuthor);

      expect(await service.update(1, updateAuthorDto)).toEqual(updatedAuthor);
    });

    it('should throw a BadRequestException on error', async () => {
      const updateAuthorDto = { name: 'John Doe Updated', biography: 'Updated biography' };
      repository.findOne.mockResolvedValue(updateAuthorDto);
      repository.save.mockRejectedValue(new Error());

      await expect(service.update(1, updateAuthorDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete an author', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if author is not found', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
