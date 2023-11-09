import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { ChangepassService } from './changepass.service';
import { ChangepassController } from './changepass.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ChangepassController],
  providers: [ChangepassService],
})
export class ChangepassModule {}
