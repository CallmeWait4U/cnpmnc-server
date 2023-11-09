import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllStaff(user_id): Promise<any> {
    const currentUser = await this.databaseService.account.findFirst({
      where: { id: user_id },
    });
    if (!(currentUser.role == Role.ADMIN)) {
      throw new UnauthorizedException();
    }
    const staffs = await this.databaseService.staff.findMany();

    return staffs;
  }

  async createStaff(staff): Promise<any> {
    const created_staff = await this.databaseService.staff.create({
      data: staff,
    });
    return created_staff;
  }

  async updateStaff(staff_id, staff): Promise<any> {
    const updated_staff = await this.databaseService.staff.update({
      data: staff,
      where: { id: staff_id },
    });
    let result = {message: "SUCCESS"}
    if (!updated_staff) result.message = "FAIL";
    return result;
  }
}
