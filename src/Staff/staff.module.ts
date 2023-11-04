import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { StaffController } from './staff.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StaffController],
  providers: [],
})
export class StaffModule {}
