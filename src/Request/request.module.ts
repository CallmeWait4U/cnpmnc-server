import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { SocketGateway } from '../socket.gateway';
import { RequestController } from './request.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RequestController],
  providers: [RequestService, SocketGateway],
})
export class RequestModule {}
