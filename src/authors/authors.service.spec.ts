// src/authors/authors.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

const mockAuthorRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
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
        { provide: getRepositoryToken(Author), useFactory: mockAuthorRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert an author', async () => {
      const authorDto = { name: 'Test Author', biography: 'Bio', dateOfBirth: new Date().toISOString() };
      const author = { ...authorDto, id: 1 } as Author;
      repository.create.mockReturnValue(author);
      repository.save.mockResolvedValue(author);

      const result = await service.create(authorDto);
      expect(result).toEqual(author);
      expect(repository.create).toHaveBeenCalledWith(authorDto);
      expect(repository.save).toHaveBeenCalledWith(author);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const author = { name: 'Test Author', biography: 'Bio', dateOfBirth: new Date().toISOString() } as Author;
      repository.find.mockResolvedValue([author]);

      const result = await service.findAll();
      expect(result).toEqual([author]);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['books'] });
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const author = { name: 'Test Author', biography: 'Bio', dateOfBirth: new Date().toISOString() } as Author;
      repository.findOne.mockResolvedValue(author);

      const result = await service.findOne(1);
      expect(result).toEqual(author);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['books'] });
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const authorDto = { name: 'Updated Test Author' };
      const author = { ...authorDto, id: 1 } as Author;
      repository.update.mockResolvedValue(author);
      repository.findOne.mockResolvedValue(author);

      const result = await service.update(1, authorDto);
      expect(result).toEqual(author);
      expect(repository.update).toHaveBeenCalledWith(1, authorDto);
    });
  });

  describe('remove', () => {
    it('should delete an author', async () => {
      repository.delete.mockResolvedValue({});
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
