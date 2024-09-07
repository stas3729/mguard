import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMonthDto } from './dto/create-month.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create-month')
  createMonth(@Body() createMonthDto: CreateMonthDto) {
    return this.appService.createMonth(createMonthDto);
  }

  @Get('months/:year')
  @ApiCreatedResponse({ description: 'Month creation' })
  @ApiParam({ name: 'year' })
  getMonthsInYear(@Param('year') year: number) {
    year = parseInt(String(year));
    return this.appService.getMonthsInYear(year);
  }

  @ApiOkResponse({ description: 'Get current month' })
  @Get('current')
  getCurrentMonth() {
    return this.appService.getCurrentMonth();
  }

  @Post('add/:year/:month')
  @ApiOkResponse({ description: 'Add expenses in chosen month' })
  @ApiParam({ name: 'year' })
  @ApiParam({ name: 'month' })
  @ApiBody({ description: 'Category in which you want to add expenses' })
  addExpensesInMonth(
    @Param('year') year: number,
    @Param('month') month: string,
    @Body() category: CreateCategoryDto,
  ) {
    year = parseInt(String(year));
    return this.appService.addExpensesInMonth(year, month, category);
  }

  @Get(':year/:month')
  @ApiOkResponse({ description: 'Get month by year and month' })
  @ApiParam({ name: 'year' })
  @ApiParam({ name: 'month' })
  getMonth(@Param('year') year: number, @Param('month') month: string) {
    year = parseInt(String(year));
    return this.appService.getMonth(year, month);
  }
}
