import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { AuthGuard } from '../Authentication/auth.guard';
import { CreateRequestDTO } from './dtos/create.request.dto';
import { JwtService } from '@nestjs/jwt';

jest.mock('./request.service');

describe('RequestController', () => {
  let requestController: RequestController;
  let requestService: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [
        RequestService,
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            //
          },
        },
      ]
    }).compile();

    requestController = module.get<RequestController>(RequestController);
    requestService = module.get<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(requestController).toBeDefined();
  });

  describe('createRequest', () => {
    it('it should return success message', async () => {
      const mockReq: CreateRequestDTO = {
        id: 'StaffId',
        reason: 'Some reason',
        startDate: 'startDate',
        endDate: 'endDate'
      }

      jest.spyOn(requestService, 'createRequest').mockResolvedValueOnce({message: 'SUCCESS'});

      const result = await requestService.createRequest(mockReq);

      expect(result).toEqual({message: "SUCCESS"})
    })
  })

  describe('getPersonalRequest', () => {
    it('should return personal requests', async () => {
      const mockStaffId = { id: 'staffId' };
      const mockRequest = [
        {
          id: 'requestId',
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
      jest
        .spyOn(requestService, 'getPersonalRequest')
        .mockResolvedValue(mockRequest);
      expect(await requestController.getPersonalRequest(mockStaffId)).toBe(
        mockRequest,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
