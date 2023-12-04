import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../Authentication/auth.guard';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

jest.mock('./request.service');

describe('StaffController', () => {
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
      ],
    }).compile();

    requestService = module.get<RequestService>(RequestService);
    requestController = module.get<RequestController>(RequestController);
  });

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
