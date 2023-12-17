import { Controller, UseGuards, Get, Post, Body, Query } from '@nestjs/common';
import { LivestockService } from './livestock.service';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';


@Controller('livestock')
export class LivestockController {
  constructor(private readonly livestockService: LivestockService) {}

  @Post('addls')
  @UseGuards(JwtAuthGuard)
  async addLs(@Body() body: { stockNumber: string; stockType: string }) {
    try {
      const { stockNumber, stockType } = body;
      const result = await this.livestockService.addLs(stockNumber, stockType);
      return { statusCode: 201, message: 'Live stock created successfully', LiveStock: result };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: error.message };
    }
  }

  @Get('getone')
  @UseGuards(JwtAuthGuard)
  async getOne(@Query() query: { stockNumber: string }) {
    try {
      const { stockNumber } = query;
      const result = await this.livestockService.getOne(stockNumber);
      return { statusCode: 200, ls: result };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: error.message };
    }
  }

  @Get('getls')
  @UseGuards(JwtAuthGuard)
  async getLs() {
    try {
      const result = await this.livestockService.getLs()
      return { statusCode: 200, LiveStock: result}
    } catch (error) {
      console.log(error)
    }
  }
  
}
