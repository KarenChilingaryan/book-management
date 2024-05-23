import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let repository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((payload) => `mockToken-${payload.username}`),
          },
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = { username: 'john_doe', password: 'password123' };
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const savedUser = { id: 1, username: registerDto.username, password: hashedPassword };

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(savedUser);
      repository.save.mockResolvedValue(savedUser);

      expect(await service.register(registerDto.username, registerDto.password)).toEqual(savedUser);
    });

    it('should throw a BadRequestException if username already exists', async () => {
      const registerDto = { username: 'john_doe', password: 'password123' };

      repository.findOne.mockResolvedValue({ id: 1, username: registerDto.username, password: 'hashedpassword' });

      await expect(service.register(registerDto.username, registerDto.password)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateUser', () => {
    it('should validate a user with correct credentials', async () => {
      const user = { id: 1, username: 'john_doe', password: await bcrypt.hash('password123', 10) };

      repository.findOne.mockResolvedValue(user);
      expect(await service.validateUser(user.username, 'password123')).toEqual({ id: user.id, username: user.username });
    });

    it('should return null for invalid credentials', async () => {
      repository.findOne.mockResolvedValue(null);
      expect(await service.validateUser('john_doe', 'wrongpassword')).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = { id: 1, username: 'john_doe' };
      const result = await service.login(user);

      expect(result).toHaveProperty('access_token', 'mockToken-john_doe');
    });
  });
});
