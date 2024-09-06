import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateMonthDto } from './dto/create-month.dto';
import { Prisma } from '@prisma/client';
import { months } from "./utils/months";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createMonth(createMonthDto: CreateMonthDto) {
    const { name, year, income, categories } = createMonthDto;
    const isUsed = await this.prisma.month.findFirst({
      where: {
        name,
        year,
      },
    });

    if (isUsed) {
      throw new HttpException(
        `Month ${name} in ${year} year is already exists.`,
        409,
      );
    };

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
  getMonthsInYear(year: number) {
    return this.prisma.month.findMany({
      where: {
        year,
      },
    });
  }

  getCurrentMonth() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = months[date.getMonth()];
    return this.prisma.month.findFirst({
      where: {
        year: currentYear,
        name: currentMonth,
      },
    });
  }
}
