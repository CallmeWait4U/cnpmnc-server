import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class RequestService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPersonalRequest(staffId) {
    let staff = await this.databaseService.staff.findFirst({
      where: { id: staffId },
    });
    if (!staff) throw new NotFoundException('Staff not found');
    let requests = await this.databaseService.request.findMany({
      where: { staffId: staffId },
    });
    return requests;
  }
}
