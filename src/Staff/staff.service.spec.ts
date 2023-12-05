import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { AuthService } from '../../src/Authentication/auth.service';
import { AuthGuard } from '../Authentication/auth.guard';
import { DetailStaffDTO } from './dto/detail.staff.dto';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

describe('StaffService', () => {
  let staffController: StaffController;
  let staffService: StaffService;
  let databaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [
        StaffService,
        AuthGuard,
        AuthService,
        DatabaseService,
        {
          provide: JwtService,
          useValue: {
            //
          },
        },
      ],
    }).compile();

    staffService = module.get<StaffService>(StaffService);
    staffController = module.get<StaffController>(StaffController);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getStaff', () => {
    it('should return staff detail', async () => {
      const mockStaff = {
        id: 'staffId',
        avatar: 'avatar',
        name: 'staffName',
        gender: 'staffGender',
        code: 'staffCode',
        position: 'staffPosition',
        department: 'staffDepartment',
        phoneNumber: 'staffPhoneNumber',
        birthday: new Date(),
        address: 'staffAddress',
      };

      const mockDetailStaff: DetailStaffDTO = { id: 'staffId' };

      jest
        .spyOn(databaseService.staff, 'findFirst')
        .mockResolvedValue(mockStaff);

      expect(await staffController.getStaff(mockDetailStaff)).toEqual(
        mockStaff,
      );
    });
  });

  describe('deleteStaff', () => {
    it ('should return fail because wrong id', async () => {
      expect(await staffService.deleteStaff("1")).toEqual({message: "FAIL"})
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
});
