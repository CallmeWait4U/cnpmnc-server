import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../Authentication/auth.guard';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

// Mock for AccountService
jest.mock('./account.service');

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            // Mock implementation or use actual JwtService with configuration
          },
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountController = module.get<AccountController>(AccountController);
  });

  describe('getInformation', () => {
    it('should return user information', async () => {
      const mockAccountInfo = { name: 'John Doe', role: 'user' };
      const mockReq = { user: { sub: 'user_id' } };

      jest
        .spyOn(accountService, 'getInformation')
        .mockResolvedValue(mockAccountInfo);

      expect(await accountController.getInformation(mockReq)).toBe(
        mockAccountInfo,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
