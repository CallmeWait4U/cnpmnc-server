import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../Authentication/auth.guard';
import { MonthStatisticDTO } from './dto/month.statistic.dto';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { RoleGuard } from '../Authentication/role.guard';

jest.mock('./statistic.service');

describe('StatisticController', () => {
  let statisticController: StatisticController;
  let statisticService: StatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticController],
      providers: [
        StatisticService,
        AuthGuard,
        RoleGuard,
        {
          provide: JwtService,
          useValue: {
            //
          },
        },
      ],
    }).compile();

    statisticService = module.get<StatisticService>(StatisticService);
    statisticController = module.get<StatisticController>(StatisticController);
  });

  describe('getStatusStatistics', () => {
    it('should return status statistics', async () => {
      const mockMonth: MonthStatisticDTO = { month: 1 };
      const mockStatusStatistics = [
        {
          status: 'status',
          count: 1,
        },
      ];
      jest
        .spyOn(statisticService, 'getStatusStatistics')
        .mockResolvedValue(mockStatusStatistics);
      expect(await statisticController.getStatusStatistics(mockMonth)).toBe(
        mockStatusStatistics,
      );
    });
  });

  describe('getDayoff', () => {
    it('should return all staff dayoff', async () => {
      const mockMonth: MonthStatisticDTO = { month: 1 };
      const mockDayoff = [
        {
          id: '123',
          name: 'abc',
          code: '456',
          dayoff: 3
        },
      ];
      jest
        .spyOn(statisticService, 'getDayOff')
        .mockResolvedValue(mockDayoff);
      expect(await statisticController.getDayoff(mockMonth)).toBe(
        mockDayoff,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
