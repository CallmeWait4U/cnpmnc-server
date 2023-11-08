import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
