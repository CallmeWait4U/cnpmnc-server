import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { SocketGateway } from '../../src/socket.gateway';
import { AuthGuard } from '../Authentication/auth.guard';
import { ChangepassController } from './changepass.controller';
import { ChangepassService } from './changepass.service';

describe('changePass', () => {
    let changepassController: ChangepassController;
    let changepassService: ChangepassService;
    let databaseService: DatabaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [ChangepassController],
          providers: [
            ChangepassService,
            AuthGuard,
            SocketGateway,
            DatabaseService,
            {
              provide: JwtService,
              useValue: {
                //
              },
            },
          ],
        }).compile();

        changepassService = module.get<ChangepassService>(ChangepassService);
        changepassController = module.get<ChangepassController>(ChangepassController);
        databaseService = module.get<DatabaseService>(DatabaseService);
    });

    describe('changePassService', () =>{
        it('all input correct, return SUCCESS', async () =>{
            expect(await changepassService.changePass("user", "123456", "12345678")).toEqual('SUCCESS')
        });
        
        it('incorrect username', async () =>{
            expect(await changepassService.changePass("user789", "123456", "12345678")).toEqual({
                "message": "Username Not Found",
                "statusCode": 404
            })
        });

        it('incorrect password', async () =>{
            expect(await changepassService.changePass("user", "123456", "12345678")).toEqual({
                "message": "Wrong password",
                "statusCode": 401
            })

            await changepassService.changePass("user", "12345678", "123456");
        });
    })
})