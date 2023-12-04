import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../Authentication/auth.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { DetailStaffDTO } from './dto/detail.staff.dto';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

jest.mock('./staff.service');

describe('StaffController', () => {
  let staffController: StaffController;
  let staffService: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [
        StaffService,
        AuthGuard,
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
  });

  describe('createStaff', () => {
    it('should return success message', async () => {
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
      const mockReq: CreateStaffDto = {
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

      jest.spyOn(staffService, 'createStaff').mockResolvedValue(mockStaff);

      expect(await staffController.createStaff(mockReq)).toBe(mockStaff);
    });
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

      const mockReq: DetailStaffDTO = { id: 'staffId' };

      jest.spyOn(staffService, 'getStaff').mockResolvedValue(mockStaff);

      const retrievedStaff = await staffController.getStaff(mockReq);

      expect(retrievedStaff).toEqual(mockStaff);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
