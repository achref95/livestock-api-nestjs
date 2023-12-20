import { Controller, UseGuards, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { LivestockService } from './livestock.service';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';


@Controller('livestock')
export class LivestockController {
  constructor(private readonly livestockService: LivestockService) {}

  @Post('addls')
  @UseGuards(JwtAuthGuard)
  async addLs(@Body() body: { stockNumber: string; stockType: string; comment: string }) {
    try {
      const { stockNumber, stockType, comment } = body;
      const result = await this.livestockService.addLs(stockNumber, stockType, comment);
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
      return { statusCode: 200, LiveStock: result, Total: result.total}
    } catch (error) {
      console.log(error)
    }
  }

  @Get('getls/:stockId')
  @UseGuards(JwtAuthGuard)
  async lsDetail(@Param('stockId') stockId: string) {
    try {
      const result = await this.livestockService.lsDetail(stockId);
      return { statusCode: 200, cattle: result };
    } catch (error) {
      console.error(error); // Use console.error for errors
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }
  
  @Put('getls/:stockId/update')
  // @UseGuards(JwtAuthGuard)
  async updateLs(
    @Param('stockId') stockId: string,
    @Body() body: { stockNumber: string; stockType: string; comment: string },
  ) {
    try {
      const { stockNumber, stockType, comment } = body;

      const result = await this.livestockService.updateLs(stockId, stockNumber, stockType, comment);
      return { statusCode: 200, cattle: result };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update livestock');
    }
  }
  
}
