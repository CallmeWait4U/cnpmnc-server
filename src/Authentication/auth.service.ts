import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(username: string, password: string): string {
    const user = await this.databaseService.findUser(username);
  }
}
