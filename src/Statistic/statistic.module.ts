import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
