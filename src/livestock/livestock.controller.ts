import { Controller, UseGuards, Post, Body } from '@nestjs/common';
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
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }
}
