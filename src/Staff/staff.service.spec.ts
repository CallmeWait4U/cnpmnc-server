import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { AuthService } from '../../src/Authentication/auth.service';
import { AuthGuard } from '../Authentication/auth.guard';
import { DetailStaffDTO } from './dto/detail.staff.dto';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
// import { UpdateStaffDto } from './dto/update-staff.dto';

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

  describe('getAllStaff', () => {
    it("should return all staffs' detail", async () => {
      const mockStaffDocuments = [
        {
          id: 'staffId',
          // avatar: 'avatar',
          name: 'staffName',
          gender: 'staffGender',
          code: 'staffCode',
          position: 'staffPosition',
          department: 'staffDepartment',
          // phoneNumber: 'staffPhoneNumber',
          birthday: new Date(),
          address: 'staffAddress',
          Account: [
            {
              //another fields
              role: 'staffRole',
            },
          ],
        },
      ];

      const mockStaffs = mockStaffDocuments.map(({ Account, ...rest }) => {
        return { ...rest, role: Account[0].role };
      });

      jest
        .spyOn(databaseService.staff, 'findMany')
        .mockResolvedValueOnce(mockStaffDocuments);

      const result = await staffService.getAllStaff();

      expect(databaseService.staff.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockStaffs);
    });
  });

  describe('creatStaff', () => {
    it('should return success message', async () => {
      const mockCreateInfo = {
        avatar: 'avatar',
        name: 'staffName',
        gender: 'staffGender',
        code: 'staffCode',
        position: 'staffPosition',
        department: 'staffDepartment',
        phoneNumber: 'staffPhoneNumber',
        birthday: new Date(),
        address: 'staffAddress',
        username: 'username',
        password: 'password',
      };
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
        numLeaveDays: 0,
        adminId: null,
      };

      jest.spyOn(databaseService.staff, 'create').mockResolvedValue(mockStaff);

      const result = await staffService.createStaff(mockCreateInfo);

      expect(databaseService.staff.create).toHaveBeenCalled();
      expect(result).toBe(mockStaff);
    });
  });

  describe('updateStaff', () => {
    it('should return success message', async () => {
      const mockUpdateInfo = {
        id: 'staffId',
        name: 'staffName',
        gender: 'staffGender',
        birthday: new Date(),
        address: 'staffAddress',
      };
      const mockStaffId = mockUpdateInfo.id;
      const mockStaff = {
        id: 'staffId',
        avatar: 'avatar',
        name: 'staffName',
        gender: 'staffGender',
        code: 'staffCode',
        position: 'staffPosition',
        department: 'staffDepartment',
        phoneNumber: 'staffPhoneNumber',
        birthday: mockUpdateInfo.birthday,
        address: 'staffAddress',
        numLeaveDays: 0,
        adminId: null,
      };

      jest.spyOn(databaseService.staff, 'update').mockResolvedValue(mockStaff);

      const result = await staffService.updateStaff(
        mockStaffId,
        mockUpdateInfo,
      );

      expect(databaseService.staff.update).toHaveBeenCalled();
      expect(result).toEqual({ message: 'SUCCESS' });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
