import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../libs/database.module';

@Injectable()
export class StatisticService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getStatusStatistics(month) {
    const dateNow = new Date();
    const dateAgo = new Date();
    dateAgo.setUTCMonth(dateNow.getUTCMonth() - month);
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

  async getDayOff(month) {
    const nows = Date.now();
    const monthoff = month * 30;
    const listStaff = await this.databaseService.staff.findMany();
    const listRequest = await this.databaseService.request.findMany();
    const dayoff = [];
    for (const staff of listStaff) {
      let count = 0;
      let countRequest = 0;
      for (const request of listRequest) {
        if (staff.id === request.staffId && request.status === 'ACCEPT') {
          let diff = 0;
          if (
            nows - monthoff * 86400000 <= request.startDate.getTime() &&
            request.endDate.getTime() <= nows
          ) {
            diff = request.endDate.getTime() - request.startDate.getTime();
          } else if (
            nows - monthoff * 86400000 > request.startDate.getTime() &&
            request.endDate.getTime() <= nows
          ) {
            diff = request.endDate.getTime() - nows + monthoff * 86400000;
          } else if (
            request.endDate.getTime() > nows &&
            nows - monthoff * 86400000 > request.startDate.getTime()
          ) {
            diff = monthoff * 86400000;
          } else if (
            request.endDate.getTime() > nows &&
            nows - monthoff * 86400000 <= request.startDate.getTime()
          ) {
            diff = nows - request.startDate.getTime();
          }
          count += diff;
          countRequest++;
        }
      }
      if (countRequest === 0) count = 0;
      count = Math.floor(count / 86400000);
      if (count > monthoff) {
        count = monthoff;
      }
      dayoff.push({ id: staff.id, name: staff.name, dayoff: count });
    }
    return dayoff;
  }
}
