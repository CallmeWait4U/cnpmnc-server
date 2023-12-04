import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { AuthGuard } from '../Authentication/auth.guard';
import { MonthStatisticDTO } from './dto/month.statistic.dto';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

describe('StatisticService', () => {
  let statisticController: StatisticController;
  let statisticService: StatisticService;
  let databaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticController],
      providers: [
        StatisticService,
        {
          provide: DatabaseService,
          useValue: {
            request: {
              groupBy: jest.fn().mockResolvedValue([
                {
                  status: 'status1',
                  _count: {
                    status: 1,
                  },
                },
                {
                  status: 'status2',
                  _count: {
                    status: 2,
                  },
                },
              ]),
            },
          },
        },
        AuthGuard,
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
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getStatusStatistics', () => {
    it('should return status statistics', async () => {
      const mockMonth: MonthStatisticDTO = { month: 1 };
      const mockStatusStatistics = [
        {
          status: 'status1',
          count: 1,
        },
        {
          status: 'status2',
          count: 2,
        },
      ];

      expect(await statisticService.getStatusStatistics(mockMonth)).toEqual(
        mockStatusStatistics,
      );
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
