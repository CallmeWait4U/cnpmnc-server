import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';
import { SocketGateway } from '../socket.gateway';

@Injectable()
export class AccountService {
  @Inject() private socketGateway: SocketGateway;
  constructor(private readonly databaseService: DatabaseService) {}

  async getInformation(account_id) {
    // console.log(account_id);
    const account = await this.databaseService.account.findFirst({
      where: { id: account_id },
    });
    if (!account) throw new UnauthorizedException();

    let info = null;
    info = await this.databaseService.staff.findFirst({
      where: { id: account.staffId },
    });
    const listNotif =
      account.role == 'ADMIN'
        ? await this.databaseService.notification.findMany({
            where: { title: 'A new leave request' },
          })
        : account.role == 'STAFF'
        ? await this.databaseService.notification.findMany({
            where: {
              staffId: info.id,
              title: {
                not: 'A new leave request',
              },
            },
          })
        : [];
    this.socketGateway.init(listNotif);
    return { ...info, role: account.role };
  }
}
