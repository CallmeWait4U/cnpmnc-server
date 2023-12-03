import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { SocketGateway } from '../socket.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AccountService, SocketGateway],
})
export class AccountModule {}
