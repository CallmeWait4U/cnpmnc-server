import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffService } from './staff.service';

@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @UseGuards(AuthGuard)
  @Get('/getAll')
  async getAllStaff(@Request() req) {
    return this.staffService.getAllStaff(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createStaff(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body() staffInfo: CreateStaffDto,
  ): Promise<any> {
    return await this.staffService.createStaff(username, password, staffInfo);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateStaff(@Body() staffInfo: UpdateStaffDto): Promise<any> {
    const staffId = staffInfo['id'];
    return await this.staffService.updateStaff(staffId, staffInfo);
  }

  @UseGuards(AuthGuard)
  @Get('/getDetail')
  async getStaff(@Query('id') staff_id) {
    return this.staffService.getStaff(staff_id);
  }

  @UseGuards(AuthGuard)
  @Post('/delete-staff')
  async deleteStaff(@Query('id') staffId) {
    return this.staffService.deleteStaff(staffId);
  }

  @Get('/fakeDate')
  async fakeDate() {
    return this.staffService.fakeData();
  }
}
