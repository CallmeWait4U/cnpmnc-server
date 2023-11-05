import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAccount(username: string, password: string): Promise<string> {
    let salt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(password, salt);
    let user = await this.databaseService.account.create({
      data: {
        username: username,
        password: passwordHash,
        role: Role.STAFF,
      },
    });
    return user.username;
  }
}
