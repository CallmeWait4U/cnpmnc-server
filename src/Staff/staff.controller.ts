import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';

@Controller('staffs')
export class StaffController {
  @UseGuards(AuthGuard)
  @Get('/')
  async getAllStaff(@Request() req) {}
}
