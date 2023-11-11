import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class StatisticService {
  constructor(private readonly databaseService: DatabaseService) {}
}
