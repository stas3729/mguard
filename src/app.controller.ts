import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateMonthDto } from './dto/create-month.dto';

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
}
