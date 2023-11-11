import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @UseGuards(AuthGuard)
  @Get('status')
  async getStatusStatistics() {
    const statusStatistics = await this.statisticService.getStatusStatistics();
    return statusStatistics;
  }
}
