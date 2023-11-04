import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AppService {
  @Inject() private readonly prisma: DatabaseService;

  async createAccount() {
    await this.prisma.account.create({
      data: {
        username: 'user1',
        password: '123456',
        role: Role.ADMIN,
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
