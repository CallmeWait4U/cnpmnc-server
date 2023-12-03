import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountModule } from './Account/account.module';
import { ChangepassModule } from './Account/changepass.module';
import { AuthModule } from './Authentication/auth.module';
import { RequestModule } from './Request/request.module';
import { StaffModule } from './Staff/staff.module';
import { StatisticModule } from './Statistic/statistic.module';
import { NotificationModule } from './Notification/notification.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
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
