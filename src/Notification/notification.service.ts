import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';
import { SocketGateway } from '../socket.gateway';

@Injectable()
export class NotificationService {
  @Inject() private socketGateway: SocketGateway;
  constructor(private readonly databaseService: DatabaseService) {}

  async updateStatus(list) {
    await Promise.all(
      list.map((i) =>
        this.databaseService.notification.update({
          where: {
            id: i.id,
          },
          data: {
            status: '1',
          },
        }),
      ),
    );
    return { message: 'SUCCESS' };
  }
}
