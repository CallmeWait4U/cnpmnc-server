import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.authService.getHello();
  // }

  @Post('register')
  async createAccount(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.createAccount(username, password);
  }
}
