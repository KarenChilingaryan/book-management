// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'testtoken' }),
            register: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const req = { user: { username: 'testuser' } };
      const result = await authController.login(req);
      expect(result).toEqual({ access_token: 'testtoken' });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const body = { username: 'testuser', password: 'testpassword' };
      const result = await authController.register(body);
      expect(result).toEqual({});
    });
  });
});
