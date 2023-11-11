import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { UpdateStatusDTO } from './dtos/update.status.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard)
  @Get('getPersonal')
  async getPersonalRequest(@Query('id') staffId: string) {
    const requests = await this.requestService.getPersonalRequest(staffId);
    return requests;
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createRequest(@Body() request: CreateRequestDTO) {
    return await this.requestService.createRequest(request);
  }

  @UseGuards(AuthGuard)
  @Post('update-status')
  async updateStatus(@Body() statusDTO: UpdateStatusDTO) {
    return await this.requestService.updateStatus(statusDTO);
  }

  @UseGuards(AuthGuard)
  @Get('getAllRequest')
  async getAllRequest() {
    const requests = await this.requestService.getAllRequest();
    return requests;
  }
}
