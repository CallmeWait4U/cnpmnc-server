import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AppService {
  @Inject() private readonly prisma: DatabaseService;

  getHello(): string {
    return 'Hello World!';
  }
}
