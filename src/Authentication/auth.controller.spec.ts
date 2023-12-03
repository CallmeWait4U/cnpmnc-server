import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            //
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('createAccount', () => {
    it('should return account information', async () => {
      const mockAccountInfo = {
        id: 'account_id',
        username: 'username',
        password: '123456',
        role: 'STAFF',
      };
      const mockReq = { username: 'username', password: '123456' };

      jest
        .spyOn(authService, 'createAccount')
        .mockResolvedValue(mockAccountInfo);

      expect(await authController.createAccount(mockReq)).toBe(mockAccountInfo);
    });
  });

  describe('createAccount', () => {
    it('should return account information', async () => {
      const mockAccountInfo = {
        id: 'account_id',
        username: 'username',
        password: '123456',
        role: 'STAFF',
      };
      const mockReq = { username: 'username', password: '123456' };

      jest
        .spyOn(authService, 'createAccount')
        .mockResolvedValue(mockAccountInfo);

      expect(await authController.createAccount(mockReq)).toBe(mockAccountInfo);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
