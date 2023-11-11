import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
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
}
