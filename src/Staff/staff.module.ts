import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
