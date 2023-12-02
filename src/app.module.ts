import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountModule } from './Account/account.module';
import { ChangepassModule } from './Account/changepass.module';
import { AuthModule } from './Authentication/auth.module';
import { RequestModule } from './Request/request.module';
import { StaffModule } from './Staff/staff.module';
import { StatisticModule } from './Statistic/statistic.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    StaffModule,
    AccountModule,
    ChangepassModule,
    RequestModule,
    StatisticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
