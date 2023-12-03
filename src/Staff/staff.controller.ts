import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../Authentication/auth.guard';
import { RoleGuard } from '../Authentication/role.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { DetailStaffDTO } from './dto/detail.staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffService } from './staff.service';

@ApiBearerAuth()
@ApiTags('staffs')
@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @UseGuards(RoleGuard)
  @Get('/getAll')
  async getAllStaff() {
    return this.staffService.getAllStaff();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createStaff(@Body() staffInfo: CreateStaffDto): Promise<any> {
    return await this.staffService.createStaff(staffInfo);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateStaff(@Body() staffInfo: UpdateStaffDto): Promise<any> {
    const staffId = staffInfo.id;
    return await this.staffService.updateStaff(staffId, staffInfo);
  }

  @UseGuards(AuthGuard)
  @Get('/getDetail')
  async getStaff(@Query() staff: DetailStaffDTO) {
    return this.staffService.getStaff(staff.id);
  }

  @UseGuards(AuthGuard)
  @Post('/delete-staff')
  async deleteStaff(@Query() staff: DetailStaffDTO) {
    return this.staffService.deleteStaff(staff.id);
  }

  @Get('/fakeDate')
  async fakeDate() {
    return this.staffService.fakeData();
  }
}
