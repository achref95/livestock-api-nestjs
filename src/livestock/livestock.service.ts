import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveStock, liveStockModel } from './livestock.model';

@Injectable()
export class LivestockService {
  constructor(@InjectModel(LiveStock.name) private readonly liveStockModel: Model<LiveStock>) {}

  async addLs(stockNumber: string, stockType: string): Promise<LiveStock> {
    if (!stockNumber || !stockType) {
      throw new Error('Stock number or stock type not provided');
    }

    const result = await this.liveStockModel.create({ stockNumber, stockType });
    return result;
  }
}
