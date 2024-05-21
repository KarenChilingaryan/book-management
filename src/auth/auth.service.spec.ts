import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
  });

  describe('validateUser', () => {
    it('should return user if validation succeeds', async () => {
      const user = new User();
      user.username = 'test';
      user.password = 'hashedPassword';
      userRepository.findOne.mockResolvedValue(user);

      const result = await authService.validateUser('test', 'testpassword');
      expect(result).toBeDefined();
      expect(result.username).toBe('test');
    });

    it('should return null if validation fails', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await authService.validateUser('test', 'testpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { username: 'test', id: 1 };
      jwtService.sign.mockReturnValue('testtoken');

      const result = await authService.login(user);
      expect(result).toEqual({ access_token: 'testtoken' });
    });
  });

  describe('register', () => {
    it('should create and save a new user', async () => {
      const user = { username: 'test', password: 'hashedPassword' };
      const savedUser = new User();
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(savedUser);

      const result = await authService.register('test', 'testpassword');
      expect(result).toEqual(savedUser);
      expect(userRepository.create).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });
});
