import { Body, Controller, Post } from '@nestjs/common';
import { ChangepassService } from './changepass.service';

@Controller('change-pass')
export class ChangepassController {
  constructor(private readonly changepassService: ChangepassService) {}

  @Post()
  async changePass(
    @Body('username') uid: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    return this.changepassService.changePass(uid, password, confirmPassword);
  }
}
