import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Request() req) {
    return this.authService.signOut(req.user.sub);
  }
}
