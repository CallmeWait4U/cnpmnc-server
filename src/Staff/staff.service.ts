import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
      throw new ForbiddenException();
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
    delete staff.id;
    // console.log(staff_id);
    // console.log(staff);
    let updated_staff
    try {
        updated_staff = await this.databaseService.staff.update({
        data: staff,
        where: { id: staff_id },
      });
    }
    catch (error){
      console.log(error);
      return {message: "FAIL"}
    }
    let result = {message: "SUCCESS"}
    if (!updated_staff) result.message = "FAIL";
    return result;
  }

  async getStaff(staff_id): Promise<any> {
    const staff = await this.databaseService.staff.findFirst({
      where: { id: staff_id },
    });
    if (!staff) throw new UnauthorizedException();
    return staff;
  }

  async deleteStaff(staffId): Promise<any>{
    try {
      await this.databaseService.staff.delete({
        where: {
          id: staffId,
        },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
    return {message: "SUCCESS"};
  }
}
