import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountModule } from './Account/account.module';
import { AuthModule } from './Authentication/auth.module';
import { RequestModule } from './Request/request.module';
import { StaffModule } from './Staff/staff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    StaffModule,
    AccountModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
