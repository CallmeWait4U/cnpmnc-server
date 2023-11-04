import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AuthModule } from './Authentication/auth.module';
import { StaffModule } from './Staff/staff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, AuthModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
