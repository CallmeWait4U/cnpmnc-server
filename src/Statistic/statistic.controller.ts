import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { RoleGuard } from 'src/Authentication/role.guard';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @UseGuards(AuthGuard)
  @Get('status')
  async getStatusStatistics(@Query('month') month: number) {
    const statusStatistics =
      await this.statisticService.getStatusStatistics(month);
    return statusStatistics;
  }

  @UseGuards(RoleGuard)
  @Get('dayoff')
  async getDayoff(@Query('month') month: number) {
    const dayoff = await this.statisticService.getDayOff(month);
    return dayoff;
  }
}
