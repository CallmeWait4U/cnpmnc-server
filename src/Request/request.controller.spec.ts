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

      expect(await requestService.createRequest(mockReq)).toStrictEqual({message: "SUCCESS"})
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
});
