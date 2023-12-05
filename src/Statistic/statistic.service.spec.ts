import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../libs/database.module';
import { AuthGuard } from '../Authentication/auth.guard';
import { MonthStatisticDTO } from './dto/month.statistic.dto';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { RoleGuard } from '../Authentication/role.guard';

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


describe('TestDayoff', () => {
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
            staff: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: "1",
                  code: "1",
                  name: "endDate < hien tai - 1 thang"
                },
                {
                  id: "2",
                  code: "2",
                  name: "endDate > hien tai && startDate > hien tai"
                },
                {
                  id: "3",
                  code: "3",
                  name: "endDate > hien tai && hien tai - 1 thang < startDate < hien tai"
                },
                {
                  id: "4",
                  code: "4",
                  name: "endDate > hien tai && startDate < hien tai - 1 thang"
                },
                {
                  id: "5",
                  code: "5",
                  name: "endDate < hien tai && startDate > hien tai - 1 thang"
                },
                {
                  id: "6",
                  code: "6",
                  name: "endDate < hien tai && startDate < hien tai - 1 thang"
                }
              ])
            },
            request: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: "1",
                  staffId: "1",
                  status: "ACCEPT",
                  startDate: "2022-12-01T09:21:10.000Z",
                  endDate: "2022-12-03T09:21:10.000Z"
                },
                {
                  id: "2",
                  staffId: "2",
                  status: "ACCEPT",
                  startDate: "2024-12-01T09:21:10.000Z",
                  endDate: "2024-12-02T09:21:10.000Z"
                },
                {
                  id: "3",
                  staffId: "3",
                  status: "ACCEPT",
                  startDate: "2023-12-02T09:21:10.000Z",
                  endDate: "2023-12-20T09:21:10.000Z"
                },
                {
                  id: "4",
                  staffId: "4",
                  status: "ACCEPT",
                  startDate: "2023-10-01T09:21:10.000Z",
                  endDate: "2023-12-20T09:21:10.000Z"
                },
                {
                  id: "5",
                  staffId: "5",
                  status: "ACCEPT",
                  startDate: "2023-12-01T09:21:10.000Z",
                  endDate: "2023-12-02T09:21:10.000Z"
                },
                {
                  id: "6",
                  staffId: "6",
                  status: "ACCEPT",
                  startDate: "2023-10-01T09:21:10.000Z",
                  endDate: "2023-12-02T09:21:10.000Z"
                },
              ])
            }
          },
        },
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
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('test dayoff', () => {
    it('should return true dayoff', async () => {
      const mockDayoff = [
        {
          id: "1",
          name: "endDate < hien tai - 1 thang",
          code: "1",
          dayoff: 0
        },
        {
          id: "2",
          name: "endDate > hien tai && startDate > hien tai",
          code: "2",
          dayoff: 0
        },
        {
          id: "3",
          name: "endDate > hien tai && hien tai - 1 thang < startDate < hien tai",
          code: "3",
          dayoff: 2
        },
        {
          id: "4",
          name: "endDate > hien tai && startDate < hien tai - 1 thang",
          code: "4",
          dayoff: 30
        },
        {
          id: "5",
          name: "endDate < hien tai && startDate > hien tai - 1 thang",
          code: "5",
          dayoff: 1
        },
        {
          id: "6",
          name: "endDate < hien tai && startDate < hien tai - 1 thang",
          code: "6",
          dayoff: 27
        },
      ];

      expect(await statisticService.getDayOff(1)).toEqual(
        mockDayoff,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});