import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateMonthDto } from './dto/create-month.dto';
import { Prisma } from '@prisma/client';
import { months } from './utils/months';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createMonth(createMonthDto: CreateMonthDto): Promise<
    Prisma.Prisma__MonthClient<
      {
        id: number;
        name: string;
        year: number;
        income: number;
      },
      never,
      DefaultArgs
    >
  > {
    const { name, year, income, categories } = createMonthDto;
    const isUsed = await this.findMonthByNameAndYear(year, name);

    if (isUsed) {
      throw new HttpException(
        `Month ${name} in ${year} year is already exists.`,
        409,
      );
    }

    const data: Prisma.MonthCreateInput = {
      name,
      year,
      income,
      categories: {
        create: categories.map((category) => ({
          name: category.name,
          expenses: category.expenses,
        })),
      },
    };

    return this.prisma.month.create({ data });
  }
  getMonthsInYear(
    year: number,
  ): Prisma.PrismaPromise<
    { id: number; name: string; year: number; income: number }[]
  > {
    return this.prisma.month.findMany({
      where: {
        year,
      },
    });
  }

  getCurrentMonth(): Prisma.Prisma__MonthClient<
    {
      categories: {
        id: number;
        name: string;
        expenses: number[];
        monthId: number;
      }[];
    } & { id: number; name: string; year: number; income: number },
    null,
    DefaultArgs
  > {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = months[date.getMonth()];
    return this.findMonthByNameAndYear(currentYear, currentMonth);
  }

  async addExpensesInMonth(
    year: number,
    month: string,
    category: CreateCategoryDto,
  ): Promise<string> {
    const monthToAddExpenses = await this.findMonthByNameAndYear(year, month);
    if (!monthToAddExpenses) {
      throw new HttpException('Such month does not exist', 404);
    }
    const existingCategory = monthToAddExpenses.categories.find(
      (cat) => category.name == cat.name,
    );
    if (!existingCategory) {
      throw new HttpException(
        'Such category in this month does not exist',
        404,
      );
    }
    await this.prisma.category.update({
      where: { id: existingCategory.id },
      data: {
        expenses: {
          push: category.expenses,
        },
      },
    });
    return 'Expenses added successfully.';
  }

  findMonthByNameAndYear(
    year: number,
    month: string,
  ): Prisma.Prisma__MonthClient<
    {
      categories: {
        id: number;
        name: string;
        expenses: number[];
        monthId: number;
      }[];
    } & { id: number; name: string; year: number; income: number },
    null,
    DefaultArgs
  > {
    return this.prisma.month.findFirst({
      where: {
        name: month,
        year,
      },
      include: {
        categories: true,
      },
    });
  }

  getMonth(
    year: number,
    month: string,
  ): Prisma.Prisma__MonthClient<
    {
      categories: {
        id: number;
        name: string;
        expenses: number[];
        monthId: number;
      }[];
    } & { id: number; name: string; year: number; income: number },
    null,
    DefaultArgs
  > {
    const newMonth = this.prisma.month.findFirst({
      where: {
        year,
        name: month,
      },
      include: {
        categories: true,
      },
    });
    if (!newMonth) {
      throw new HttpException('Such month does not exist', 404);
    }
    return newMonth;
  }
}
