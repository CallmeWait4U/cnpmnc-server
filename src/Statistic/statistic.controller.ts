import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { StatisticService } from './statistic.service';
import { RoleGuard } from 'src/Authentication/role.guard';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @UseGuards(AuthGuard)
  @Get('status')
  async getStatusStatistics() {
    const statusStatistics = await this.statisticService.getStatusStatistics();
    return statusStatistics;
  }

  @UseGuards(RoleGuard)
  @Get('dayoff')
  async getDayoff(@Query('month') month: number){
    const dayoff = await this.statisticService.getDayOff(month);
    return dayoff;
  }
}
