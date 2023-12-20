import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveStock, liveStockModel } from './livestock.model';

@Injectable()
export class LivestockService {
  constructor(@InjectModel(LiveStock.name) private readonly liveStockModel: Model<LiveStock>) {}

  async addLs(stockNumber: string, stockType: string, comment: string): Promise<LiveStock> {
    if (!stockNumber || !stockType) {
      throw new Error('Stock number or stock type not provided');
    }

    const result = await this.liveStockModel.create({ stockNumber, stockType, comment });
    return result;
  }

  async getOne(stockNumber: string): Promise<LiveStock[]> {
    if (!stockNumber) {
      throw new Error('Stock number not provided')
    }

    const result = await this.liveStockModel.find({ stockNumber })
    if (!result || result.length === 0) {
      throw new NotFoundException('No cattle found with that number');
    }
    return result;
  }

  async getLs() {
    try {
      const result = await this.liveStockModel.find()
      if (!result || result.length === 0) {
        // throw new NotFoundException('No cattles found in the database');
        return { statusCode: 400, message: 'No cattle found in the database' };
      }

      return {result: result, total: result.length}
    } catch (error) {
      console.log(error)
    }
  }

  async lsDetail(stockId: string): Promise<any> {
    try {
      const result = await this.liveStockModel.findById(stockId);
      if (!result) {
        throw new NotFoundException('No cattle with that ID found in the database');
      }
      return result;
    } catch (error) {
      console.error(error); // Use console.error for errors
      throw new NotFoundException('No cattle with that ID found in the database');
    }
  }

  async updateLs(stockId: string, stockNumber: string, stockType: string, comment: string): Promise<any> {
    try {
      const result = await this.liveStockModel.findByIdAndUpdate(
        stockId,
          {
            stockNumber: stockNumber,
            stockType: stockType,
            comment: comment 
          },
        { new: true }, // This option returns the updated document
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update livestock');
    }
  }

  async deleteLs(stockId: string): Promise<any> {
    try {
      const result = await this.liveStockModel.findByIdAndDelete(stockId)
      return result
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete livestock');

    }
  }
}
