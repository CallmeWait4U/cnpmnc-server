import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { ChangepassController } from './changepass.controller';
import { ChangepassService } from './changepass.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChangepassController],
  providers: [ChangepassService],
})
export class ChangepassModule {}
