import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountModule } from './Account/account.module';
import { AuthModule } from './Authentication/auth.module';
import { StaffModule } from './Staff/staff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangepassModule } from './Authentication/changepass.module';

@Module({
  imports: [DatabaseModule, AuthModule, StaffModule, AccountModule, ChangepassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
