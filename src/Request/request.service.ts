import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'libs/database.module';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { RequestResponseDto } from './dtos/request.response.dto';
import { UpdateStatusDTO } from './dtos/update.status.dto';
import { RequestDto } from './dtos/request.dto';

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


  async getAllRequest(): Promise<RequestDto[]>{
    const requests = await this.databaseService.request.findMany();
    if (!requests) throw new NotFoundException('Request not found');
    // const requestDTOs: RequestDto[] = [];
    // for (const request of requests){
    //   requestDTOs.push(new RequestDto(request));
    // }

    return requests as RequestDto[];
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

  async updateStatus(statusDTO: UpdateStatusDTO){
    try{
      await this.databaseService.request.update({
        where: {
          id: statusDTO.id,
        },
        data: {
          status: statusDTO.status,
        },
      }
      )
    }
    catch{
      return {message: "FAIL"}
    }
    return {message: "SUCCESS"}
  }
}
