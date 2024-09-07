import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMonthDto } from './dto/create-month.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create-month')
  createMonth(@Body() createMonthDto: CreateMonthDto) {
    return this.appService.createMonth(createMonthDto);
  }

  @Get('months/:year')
  getMonthsInYear(@Param('year') year: number) {
    year = parseInt(String(year));
    return this.appService.getMonthsInYear(year);
  }

  @Get('current')
  getCurrentMonth() {
    return this.appService.getCurrentMonth();
  }

  @Post('add/:year/:month')
  addExpensesInMonth(
    @Param('year') year: number,
    @Param('month') month: string,
    @Body() category: CreateCategoryDto,
  ) {
    year = parseInt(String(year));
    return this.appService.addExpensesInMonth(year, month, category);
  }

  @Get(':year/:month')
  getMonth(@Param('year') year: number, @Param('month') month: string) {
    year = parseInt(String(year));
    return this.appService.getMonth(year, month);
  }
}
