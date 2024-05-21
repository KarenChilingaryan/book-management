import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
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
    it('should create an author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author',
        biography: 'Bio',
        dateOfBirth: new Date().toISOString(),
      };
      const result = await controller.create(createAuthorDto);
      expect(result).toEqual({});
      expect(service.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({});
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = { name: 'Updated Test Author' };
      const result = await controller.update('1', updateAuthorDto);
      expect(result).toEqual({});
      expect(service.update).toHaveBeenCalledWith(1, updateAuthorDto);
    });
  });

  describe('remove', () => {
    it('should delete an author', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({});
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
