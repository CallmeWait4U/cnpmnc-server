import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountModule } from './Account/account.module';
import { ChangepassModule } from './Account/changepass.module';
import { AuthModule } from './Authentication/auth.module';
import { NotificationModule } from './Notification/notification.module';
import { RequestModule } from './Request/request.module';
import { StaffModule } from './Staff/staff.module';
import { StatisticModule } from './Statistic/statistic.module';
import { SocketModule } from './socket.modules'; // Sang

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    StaffModule,
    AccountModule,
    ChangepassModule,
    RequestModule,
    StatisticModule,
    SocketModule, //Sang
    NotificationModule, //Sang
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
