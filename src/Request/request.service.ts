import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'libs/database.module';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { RequestResponseDto } from './dtos/request.response.dto';
import { UpdateStatusDTO } from './dtos/update.status.dto';
import { SocketGateway } from '../socket.gateway';
@Injectable()
export class RequestService {
  private socketGateway: SocketGateway;
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

  async getAllRequest(): Promise<RequestResponseDto[]> {
    const requests = await this.databaseService.request.findMany({
      include: {
        Staff: {
          select: {
            name: true,
            code: true,
            numLeaveDays: true,
          },
        },
      },
    });
    if (!requests) throw new NotFoundException('Request not found');
    const results: RequestResponseDto[] = requests.map(({ Staff, ...rest }) => {
      return plainToClass(
        RequestResponseDto,
        { ...Staff, ...rest },
        { excludeExtraneousValues: true },
      );
    });
    // return plainToClass(results, )
    this.socketGateway.sendToAll();
    return results;
  }

  async createRequest(staff: CreateRequestDTO) {
    const data = {
      title: 'test',
      reason: staff.reason,
      startDate: new Date(staff.startDate),
      endDate: new Date(staff.endDate),
      status: 'PENDING',
    };

    await this.databaseService.request.create({
      data: {
        ...data,
        Staff: { connect: { id: staff.id } },
      },
    });

    return { message: 'SUCCESS' };
  }

  async updateStatus(statusDTO: UpdateStatusDTO) {
    const request_need_update = await this.databaseService.request.findFirst({
      where: {
        id: statusDTO.id,
      },
      include: {
        Staff: true,
      },
    });
    const startDate = new Date(request_need_update.startDate).getTime();
    const endDate = new Date(request_need_update.endDate).getTime();
    const days = (endDate - startDate) / (3600 * 24 * 1000);
    const staffId = request_need_update.staffId;
    let rmt = request_need_update.Staff.numLeaveDays;
    rmt = rmt < days ? 0 : rmt - days;

    try {
      await this.databaseService.request.update({
        where: {
          id: statusDTO.id,
        },
        data: {
          status: statusDTO.status,
        },
      });

      if (statusDTO.status === 'ACCEPT') {
        await this.databaseService.staff.update({
          where: {
            id: staffId,
          },
          data: {
            numLeaveDays: rmt,
          },
        });
      }
    } catch {
      return { message: 'FAIL' };
    }
    return { message: 'SUCCESS' };
  }
}
