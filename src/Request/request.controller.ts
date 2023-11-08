import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard)
  @Get('getPersonal')
  async getPersonalRequest(@Query('id') staffId: string) {
    let requests = await this.requestService.getPersonalRequest(staffId);
    return requests;
  }
}
