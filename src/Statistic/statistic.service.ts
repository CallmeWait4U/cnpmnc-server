import {Injectable} from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class StatisticService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getStatusStatistics() {
    const statusStatistics = await this.databaseService.request.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    const returnStatistics = statusStatistics.map((status) => {
      return {
        status: status.status,
        count: status._count.status,
      };
    });
    return returnStatistics;
  }

  async getDayOff(month){
    const monthoff = month*30;
    const listStaff = await this.databaseService.staff.findMany();
    const listRequest = await this.databaseService.request.findMany();
    let dayoff = [];
    for (let staff of listStaff){
      let count = 0;
      let countRequest = 0;
      for (let request of listRequest){
        if (staff.id === request.staffId && request.status === "ACCEPT"){
          const diff = Math.abs(request.endDate.getTime() - request.startDate.getTime());
          count+=diff;
          countRequest++;
        }
      }
      if (countRequest === 0) count = 0;
      count = Math.floor(count / 86400000);
      if (count > monthoff){
        count = monthoff;
      }
      dayoff.push({id: staff.id, name: staff.name, dayoff: count})
    }
    return dayoff;
  }
}
