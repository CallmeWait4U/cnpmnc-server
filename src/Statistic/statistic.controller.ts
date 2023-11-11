import { Controller } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('test')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
}
