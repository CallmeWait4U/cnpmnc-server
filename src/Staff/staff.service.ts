import { faker } from '@faker-js/faker/locale/vi';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role, Staff } from '@prisma/client';
import { DatabaseService } from 'libs/database.module';
import { AuthService } from 'src/Authentication/auth.service';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {
  // @Inject() ;
  constructor(
    private readonly databaseService: DatabaseService,
    private authService: AuthService,
  ) {}

  async getAllStaff(user_id): Promise<any> {
    const currentUser = await this.databaseService.account.findFirst({
      where: { id: user_id },
    });
    if (!(currentUser.role == Role.ADMIN)) {
      throw new ForbiddenException();
    }
    const staffs = await this.databaseService.staff.findMany();

    return staffs;
  }

  async createStaff(
    username: string,
    password: string,
    staff: CreateStaffDto,
  ): Promise<any> {
    staff.birthday = new Date(staff.birthday);
    const createdAccount = await this.authService.createAccount(
      username,
      password,
    );
    const created_staff = await this.databaseService.staff.create({
      data: {
        ...staff,
        numLeaveDays: 20,
        Account: { connect: { id: createdAccount.id } },
      },
    });
    return created_staff;
  }

  async updateStaff(staff_id, staff): Promise<any> {
    delete staff.id;
    let updated_staff: Staff;
    try {
      updated_staff = await this.databaseService.staff.update({
        data: staff,
        where: { id: staff_id },
        include: { Account: true },
      });
    } catch {
      return { message: 'FAIL' };
    }
    const result = { message: 'SUCCESS' };
    if (!updated_staff) result.message = 'FAIL';
    return result;
  }

  async getStaff(staff_id): Promise<any> {
    const staff = await this.databaseService.staff.findFirst({
      where: { id: staff_id },
    });
    if (!staff) throw new UnauthorizedException();
    return staff;
  }

  async deleteStaff(staffId): Promise<any> {
    try {
      await this.databaseService.staff.delete({
        where: {
          id: staffId,
        },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
    return { message: 'SUCCESS' };
  }

  async fakeData() {
    const pros: Promise<any>[] = [];
    for (let i = 0; i < 20; i++) {
      const phone = faker.phone.number().split(' ').join('');
      const data: CreateStaffDto = {
        avatar: faker.image.avatar(),
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(['Nam', 'Nữ']),
        code: faker.string.uuid(),
        position: faker.person.jobTitle(),
        department: faker.person.jobArea(),
        phoneNumber: phone,
        birthday: faker.date.past(),
        address: faker.location.streetAddress(),
      };
      pros.push(this.createStaff(phone, '123456', data));
    }
    await Promise.all(pros);
  }
}
