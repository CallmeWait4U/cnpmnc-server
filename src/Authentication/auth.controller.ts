import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createAccount(@Body() body: AuthDTO) {
    return this.authService.createAccount(body.username, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: AuthDTO) {
    return this.authService.signIn(body.username, body.password);
  }
}
