import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../Authentication/auth.guard';
import { ChangepassService } from './changepass.service';

@Controller('change-pass')
export class ChangepassController {
  constructor(private readonly changepassService: ChangepassService) {}

  @UseGuards(AuthGuard)
  @Post()
  async changePass(
    @Body('username') uid: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    return this.changepassService.changePass(uid, password, confirmPassword);
  }
}
