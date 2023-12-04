import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from '../../libs/database.module';
import { SocketGateway } from '../socket.gateway';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { RequestResponseDto } from './dtos/request.response.dto';
import { UpdateStatusDTO } from './dtos/update.status.dto';
@Injectable()
export class RequestService {
  @Inject() private socketGateway: SocketGateway;
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
          { ...staff, ...request },
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
    return results;
  }

  async createRequest(staff: CreateRequestDTO) {
    const time = new Date().toISOString();
    const data = {
      title: 'test',
      reason: staff.reason,
      startDate: new Date(staff.startDate),
      endDate: new Date(staff.endDate),
      status: 'PENDING',
    };
    const dataStaff = await this.databaseService.staff.findFirst({
      where: {
        id: staff.id,
      },
    });
    await this.databaseService.request.create({
      data: {
        ...data,
        Staff: { connect: { id: staff.id } },
      },
    });
    const dataNotif = {
      title: 'A new leave request',
      content: `A new leave request was sended at ${new Date().toLocaleString()} by ${
        dataStaff.name
      }  needed to review`,
      status: '0',
      time,
      Staff: { connect: { id: staff.id } },
    };
    await this.databaseService.notification.create({ data: dataNotif });
    const listNotif = await this.databaseService.notification.findMany({});
    this.socketGateway.createLeave(listNotif);
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
      let title = '',
        content = '';
      const now = new Date();
      const timeNow = now.toLocaleString();
      if (statusDTO.status == 'ACCEPT') {
        title = 'Your request was approved';
        content = `Your request was approved at ${timeNow}`;
      } else {
        title = 'Your request was rejected';
        content = `Your request was rejected at ${timeNow}`;
      }
      const dataNotif = {
        title,
        content,
        status: '0',
        time: now.toISOString(),
        Staff: { connect: { id: staffId } },
      };
      await this.databaseService.notification.create({
        data: dataNotif,
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
    const listNotif = await this.databaseService.notification.findMany({});
    this.socketGateway.handleRequest({
      list: listNotif,
      userId: staffId,
    });
    return { message: 'SUCCESS' };
  }
}
