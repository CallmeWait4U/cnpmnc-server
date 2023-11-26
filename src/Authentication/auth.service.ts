import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'libs/database.module';

@Injectable()
export class AuthService {
  private saltOrRounds: number;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {
    this.saltOrRounds = 10;
  }

  async createAccount(username: string, password: string): Promise<any> {
    const passwordHashed = await bcrypt.hash(password, this.saltOrRounds);
    const old_user = await this.databaseService.account.findFirst({
      where: { username },
    });
    if (old_user) throw new UnauthorizedException();
    const user = await this.databaseService.account.create({
      data: {
        username: username,
        password: passwordHashed,
        role: Role.STAFF,
      },
    });
    return user;
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.databaseService.account.findFirst({
      where: { username },
    });
    if (!user) throw new UnauthorizedException();
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    await this.databaseService.account.update({
      data: { token: access_token },
      where: { id: user.id },
    });

    return {
      access_token,
    };
  }

  async signOut(userId: string) {
    await this.databaseService.account.update({
      data: { token: null },
      where: { id: userId },
    });
  }
}
