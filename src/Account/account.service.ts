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
    info = await this.databaseService.staff.findFirst({
      where: { id: account.staffId },
    });
    return { ...info, role: account.role };
  }
}
