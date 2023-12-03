import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { NotificationService } from './notification.service';

@ApiBearerAuth()
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Post('/updateStatus')
  async updateStatus(@Body('list') listNotif) {
    return this.notificationService.updateStatus(listNotif);
  }
}
