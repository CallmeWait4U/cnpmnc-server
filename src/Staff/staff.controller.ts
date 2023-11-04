import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { StaffService } from './staff.service';

@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async getAllStaff(@Request() req) {
    return this.staffService.getAllStaff(req.user.sub);
  }
}
