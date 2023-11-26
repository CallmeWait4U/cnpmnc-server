import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { AccountService } from './account.service';

@ApiBearerAuth()
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Get('/info')
  async getInformation(@Request() req) {
    return this.accountService.getInformation(req.user.sub);
  }
}
