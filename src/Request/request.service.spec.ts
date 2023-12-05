import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from '../../libs/database.module';
import { SocketGateway } from '../../src/socket.gateway';
import { AuthGuard } from '../Authentication/auth.guard';
import { RequestResponseDto } from './dtos/request.response.dto';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { CreateRequestDTO } from './dtos/create.request.dto';

describe('StaffService', () => {
  let requestController: RequestController;
  let requestService: RequestService;
  let databaseService: DatabaseService;
  let socketGateway: SocketGateway;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [
        RequestService,
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

    requestService = module.get<RequestService>(RequestService);
    requestController = module.get<RequestController>(RequestController);
    databaseService = module.get<DatabaseService>(DatabaseService);
    socketGateway = module.get<SocketGateway>(SocketGateway);
  });

  describe('getPersonalRequest', () => {
    it('should return personal requests', async () => {
      const mockRequests = [
        {
          id: 'requestId1',
          title: 'test',
          reason: 'test',
          startDate: new Date(),
          endDate: new Date(),
          status: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          staffId: 'staffId',
        },
        {
          id: 'requestId2',
          title: 'test',
          reason: 'test',
          startDate: new Date(),
          endDate: new Date(),
          status: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          staffId: 'staffId',
        },
      ];
      const mockStaff = { id: 'staffId', Request: mockRequests };

      jest
        .spyOn(databaseService.staff, 'findFirst')
        .mockResolvedValue(mockStaff);

      let mockRequestResponseDtos = [];
      for (const request of mockStaff.Request) {
        mockRequestResponseDtos.push(
          plainToClass(
            RequestResponseDto,
            { ...mockStaff, ...request },
            { excludeExtraneousValues: true },
          ),
        );
      }
      expect(await requestService.getPersonalRequest(mockStaff)).toEqual(
        mockRequestResponseDtos,
      );
    });
  });
  
  describe('createRequest', () => {
    it('should return success message', async () => {
      const mockRequest: CreateRequestDTO = {
        id: 'StaffId',
        reason: 'Some reason',
        startDate: 'startDate',
        endDate: 'endDate'
      }
      
      databaseService.request.create = jest.fn();
      databaseService.staff.findFirst = jest.fn(() => {return {name: 'any'}});
      databaseService.notification.create = jest.fn();
      databaseService.notification.findMany = jest.fn();
      socketGateway.createLeave = jest.fn();

      // jest.spyOn(databaseService.request, 'create').mockResolvedValueOnce({});

      const result = await requestService.createRequest(mockRequest)

      expect(databaseService.request.create).toHaveBeenCalled();
      expect(result).toEqual({message: "SUCCESS"});
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
