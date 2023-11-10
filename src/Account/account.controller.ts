import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authentication/auth.guard';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Get('/info')
  async getInformation(@Request() req) {
    // console.log(req.user.sub);
    return this.accountService.getInformation(req.user.sub);
  }
}
