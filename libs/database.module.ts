import { Global, Injectable, Module, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private _staff: any;
  public get staff(): any {
    return this._staff;
  }
  public set staff(value: any) {
    this._staff = value;
  }
  private _account: any;
  public get account(): any {
    return this._account;
  }
  public set account(value: any) {
    this._account = value;
  }
  async onModuleInit() {
    await this['$connect']();
  }
}

@Global()
@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
