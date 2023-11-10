import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role, Staff } from '@prisma/client';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async createStaff(staff): Promise<any> {
    staff.birthday = new Date(staff.birthday);
    staff.numLeaveDays = 20;
    const created_staff = await this.databaseService.staff.create({
      data: {
        ...staff,
        // Account: { connect: { id: '654b8d41f23b3e78021febbc' } },
      },
    });
    return created_staff;
  }

  async updateStaff(staff_id, staff): Promise<any> {
    let updated_staff: Staff;
    try {
      updated_staff = await this.databaseService.staff.update({
        data: staff,
        where: { id: staff_id },
        include: { Account: true },
      });
      // await this.databaseService.account.update({
      //   data: { role: staff.role },
      //   where: { id: updated_staff.Account },
      // });
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
}
