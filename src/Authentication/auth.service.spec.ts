import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../libs/database.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

describe('AuthService', () => {
  let authController: AuthController;
  let authService: AuthService;
  let datbaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        DatabaseService,
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('access_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
    datbaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('signIn', () => {
    it('should return access_token', async () => {
      const mockAuth: AuthDTO = {
        username: 'username',
        password: '123456',
      };

      const mockAccountInfo = {
        usenname: 'username',
        password: await bcrypt.hash('123456', 10),
        role: 'STAFF',
      };

      jest
        .spyOn(datbaseService.account, 'findFirst')
        .mockResolvedValue(mockAccountInfo);
      jest.spyOn(datbaseService.account, 'update').mockResolvedValue(null);

      expect(await authController.signIn(mockAuth)).toEqual({
        access_token: 'access_token',
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
