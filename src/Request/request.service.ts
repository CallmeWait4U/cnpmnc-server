import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'libs/database.module';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { RequestResponseDto } from './dtos/request.response.dto';

@Injectable()
export class RequestService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPersonalRequest(staffId) {
    const staff = await this.databaseService.staff.findFirst({
      where: { id: staffId },
      include: { Request: true },
    });
    if (!staff) throw new NotFoundException('Staff not found');
    const requests = [];
    for (const request of staff.Request) {
      requests.push(
        plainToClass(
          RequestResponseDto,
          { ...request, ...staff },
          { excludeExtraneousValues: true },
        ),
      );
    }
    return requests;
  }

  async createRequest(staff: CreateRequestDTO) {
    const data = {
      title: 'test',
      reason: staff.reason,
      startDate: staff.startDate,
      endDate: staff.endDate,
      status: 'PENDING',
    };
    try {
      await this.databaseService.request.create({
        data: {
          ...data,
          Staff: { connect: { id: staff.id } },
        },
      });
    }
    catch {
      return {message: "FAIL"};
    }
    return { message: 'SUCCESS' };
  }
}
