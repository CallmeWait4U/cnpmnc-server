import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { SocketGateway } from '../socket.gateway';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  let databaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        DatabaseService,
        SocketGateway,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountController = module.get<AccountController>(AccountController);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getInformation', () => {
    it('should return user information', async () => {
      const mockAccountId = 'accountId';
      const mockAccount = {
        id: 'accountId',
        staffId: 'staffId',
        role: 'STAFF',
      };
      const mockStaff = {
        id: 'staffId',
      };

      jest
        .spyOn(databaseService.account, 'findFirst')
        .mockResolvedValueOnce(mockAccount);

      jest
        .spyOn(databaseService.staff, 'findFirst')
        .mockResolvedValueOnce(mockStaff);

      jest
        .spyOn(databaseService.notification, 'findMany')
        .mockResolvedValueOnce([]);
      expect(await accountService.getInformation(mockAccountId)).toEqual({
        ...mockStaff,
        role: mockAccount.role,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
