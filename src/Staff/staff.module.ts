import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AuthService } from 'src/Authentication/auth.service';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StaffController],
  providers: [StaffService, AuthService],
})
export class StaffModule {}
