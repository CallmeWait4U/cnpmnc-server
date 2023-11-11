import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'libs/database.module';
const saltRounds = 10;

@Injectable()
export class ChangepassService {
  constructor(private readonly databaseService: DatabaseService) {}

  async changePass(
    username: string,
    password: string,
    confirmPassword: string,
  ): Promise<any> {
    const user = await this.databaseService.account.findFirst({
      where: { username: username },
    });
    if (!user) throw new NotFoundException();
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const passwordHashed = await bcrypt.hash(confirmPassword, saltRounds);
    await this.databaseService.account.update({
      where: {
        username: username,
      },
      data: {
        password: passwordHashed,
      },
    });
    return 'SUCCESS';
  }
}
