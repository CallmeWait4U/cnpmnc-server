import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AccountService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getInformation(account_id) {
    console.log(account_id);
    const account = await this.databaseService.account.findFirst({
      where: { id: account_id },
    });
    if (!account) throw new UnauthorizedException();

    let info = null;
    // console.log(account);
    // if (account.role === Role.ADMIN) {
    //   info = await this.databaseService.admin.findFirst({
    //     where: { id: account.adminId },
    //   });
    // }
    // if (account.role == Role.STAFF) {
    info = await this.databaseService.staff.findFirst({
      where: { id: account.staffId },
    });
    // }

    return info;
  }
}
