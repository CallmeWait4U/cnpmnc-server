import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class StatisticService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getStatusStatistics(month) {
    const dateNow = new Date();
    const dateAgo = new Date();
    dateAgo.setUTCMonth(dateNow.getUTCMonth() - month);
    // console.log(dateAgo, dateNow);
    const statusStatistics = await this.databaseService.request.groupBy({
      by: ['status'],
      _count: { status: true },
      where: {
        startDate: {
          gte: dateAgo,
          lt: dateNow,
        },
      },
    });
    const returnStatistics = statusStatistics.map((status) => {
      return {
        status: status.status,
        count: status._count.status,
      };
    });
    return returnStatistics;
  }
}
