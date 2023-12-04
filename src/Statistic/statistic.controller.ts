import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../Authentication/auth.guard';
import { RoleGuard } from '../Authentication/role.guard';
import { MonthStatisticDTO } from './dto/month.statistic.dto';
import { StatisticService } from './statistic.service';

@ApiBearerAuth()
@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @UseGuards(AuthGuard)
  @Get('status')
  async getStatusStatistics(@Query() query: MonthStatisticDTO) {
    const statusStatistics = await this.statisticService.getStatusStatistics(
      query.month,
    );
    return statusStatistics;
  }

  @UseGuards(RoleGuard)
  @Get('dayoff')
  async getDayoff(@Query() query: MonthStatisticDTO) {
    const dayoff = await this.statisticService.getDayOff(query.month);
    return dayoff;
  }
}
