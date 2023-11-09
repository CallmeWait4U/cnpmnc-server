import { Controller, Get, Request, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { StaffService } from './staff.service';

@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @UseGuards(AuthGuard)
  @Get('/getAll')
  async getAllStaff(@Request() req) {
    return this.staffService.getAllStaff(req.user.sub);
  }

  @Post('update')
  async updateStaff(@Body() staffInfo: any): Promise<any> {
    const staffId = staffInfo['id']
    return await this.staffService.updateStaff(staffId, staffInfo);
  }
}
