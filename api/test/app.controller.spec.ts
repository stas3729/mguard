import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { CreateMonthDto } from '../src/dto/create-month.dto';
import { CreateCategoryDto } from '../src/dto/create-category.dto';
import { HttpException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createMonth: jest.fn(),
            getMonthsInYear: jest.fn(),
            getCurrentMonth: jest.fn(),
            addExpensesInMonth: jest.fn(),
            getMonth: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('createMonth', () => {
    it('should successfully create a month', async () => {
      const createMonthDto: CreateMonthDto = {
        name: 'January',
        year: 2024,
        income: 1000,
        categories: [],
      };
      const result = { id: 1, ...createMonthDto };
      jest.spyOn(appService, 'createMonth').mockResolvedValue(result as any);

      expect(await appController.createMonth(createMonthDto)).toEqual(result);
      expect(appService.createMonth).toHaveBeenCalledWith(createMonthDto);
    });

    it('should throw conflict exception if month already exists', async () => {
      const createMonthDto: CreateMonthDto = {
        name: 'January',
        year: 2024,
        income: 1000,
        categories: [],
      };
      jest
        .spyOn(appService, 'createMonth')
        .mockRejectedValue(
          new HttpException(
            'Month January in 2024 year is already exists.',
            409,
          ),
        );

      await expect(appController.createMonth(createMonthDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getMonthsInYear', () => {
    it('should return list of months for the year', async () => {
      const year = 2024;
      const result = [{ id: 1, name: 'January', year, income: 1000 }];
      jest
        .spyOn(appService, 'getMonthsInYear')
        .mockResolvedValue(result as any);

      expect(await appController.getMonthsInYear(year)).toEqual(result);
      expect(appService.getMonthsInYear).toHaveBeenCalledWith(year);
    });
  });

  describe('getCurrentMonth', () => {
    it('should return the current month details', async () => {
      const currentMonthMock = {
        id: 1,
        name: 'January',
        year: 2024,
        income: 1000,
      };
      jest
        .spyOn(appService, 'getCurrentMonth')
        .mockResolvedValue(currentMonthMock as any);

      expect(await appController.getCurrentMonth()).toEqual(currentMonthMock);
      expect(appService.getCurrentMonth).toHaveBeenCalled();
    });
  });

  describe('addExpensesInMonth', () => {
    it('should successfully add expenses to a category', async () => {
      const year = 2024;
      const month = 'January';
      const category: CreateCategoryDto = {
        name: 'Groceries',
        expenses: [200],
      };
      jest
        .spyOn(appService, 'addExpensesInMonth')
        .mockResolvedValue('Expenses added successfully.');

      expect(
        await appController.addExpensesInMonth(year, month, category),
      ).toBe('Expenses added successfully.');
      expect(appService.addExpensesInMonth).toHaveBeenCalledWith(
        year,
        month,
        category,
      );
    });

    it('should throw not found exception if month does not exist', async () => {
      const year = 2024;
      const month = 'January';
      const category: CreateCategoryDto = {
        name: 'Groceries',
        expenses: [200],
      };
      jest
        .spyOn(appService, 'addExpensesInMonth')
        .mockRejectedValue(new HttpException('Such month does not exist', 404));

      await expect(
        appController.addExpensesInMonth(year, month, category),
      ).rejects.toThrow(HttpException);
    });

    it('should throw not found exception if category does not exist', async () => {
      const year = 2024;
      const month = 'January';
      const category: CreateCategoryDto = {
        name: 'Groceries',
        expenses: [200],
      };
      jest
        .spyOn(appService, 'addExpensesInMonth')
        .mockRejectedValue(
          new HttpException('Such category in this month does not exist', 404),
        );

      await expect(
        appController.addExpensesInMonth(year, month, category),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('getMonth', () => {
    it('should return month details', async () => {
      const year = 2024;
      const month = 'January';
      const result = { id: 1, name: month, year, income: 1000, categories: [] };
      jest.spyOn(appService, 'getMonth').mockResolvedValue(result as any);

      expect(await appController.getMonth(year, month)).toEqual(result);
      expect(appService.getMonth).toHaveBeenCalledWith(year, month);
    });

    it('should throw not found exception if month does not exist', async () => {
      const year = 2024;
      const month = 'January';
      jest
        .spyOn(appService, 'getMonth')
        .mockRejectedValue(new HttpException('Such month does not exist', 404));

      await expect(appController.getMonth(year, month)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
