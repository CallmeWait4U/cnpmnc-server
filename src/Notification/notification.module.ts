import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SocketGateway } from '../socket.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, SocketGateway],
})
export class NotificationModule {}
