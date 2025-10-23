import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
require('dotenv').config();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(process.env.DATABASE_URL);
    // eslint-disable-next-line prettier/prettier
    console.log("Abc");
    return this.appService.getHello();
  }
}
