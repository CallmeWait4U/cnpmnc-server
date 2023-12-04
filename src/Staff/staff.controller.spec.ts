import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../Authentication/auth.guard';
import { RoleGuard } from '../Authentication/role.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { UpdateStaffDto } from './dto/update-staff.dto';

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
        RoleGuard,
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
  
  describe('updateStaff', () => {
    it('should return success message', async () => {
      const mockReq: UpdateStaffDto = {
        id: 'ObjectId',
        name: 'staffName',
        gender: 'staffGender',
        birthday: new Date(),
        address: 'staffAddress',
      };

      jest.spyOn(staffService, 'updateStaff').mockResolvedValueOnce({message: "SUCCESS"});

      // expect(staffService.updateStaff).toHaveBeenCalledWith(mockReq.id, mockReq)
      expect(await staffController.updateStaff(mockReq)).toStrictEqual({message: "SUCCESS"});
    });
  });

  describe('getAllStaff', () => {
    it('should return array of staffs', async () => {
      const mockStaffs = [
        {
          id: 'StaffId',
          name: "Name",
          code: "Code",
          position: "Position",
          department: "Department",
          birthday: "Birthday",
          gender: "Gender",
          address: 'Address',
          role: "Role"
        }
      ]

      jest.spyOn(staffService, 'getAllStaff').mockResolvedValueOnce(mockStaffs);

      // expect(staffService.updateStaff).toHaveBeenCalledWith(mockReq.id, mockReq)
      expect(await staffController.getAllStaff()).toStrictEqual(mockStaffs);
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
