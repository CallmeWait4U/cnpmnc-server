import {
  Injectable
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../libs/database.module';
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
    if (!user){
      return {
          "message": "Username Not Found",
          "statusCode": 404
      }
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        "message": "Wrong password",
        "statusCode": 401
    }
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
