import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivestockController } from './livestock.controller';
import { LivestockService } from './livestock.service';
import { LiveStock, liveStockModel } from './livestock.model';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';


@Module({
  imports: [MongooseModule.forFeature([{ name: LiveStock.name, schema: liveStockModel }])],
  controllers: [LivestockController],
  providers: [LivestockService, JwtAuthGuard],
})
export class LivestockModule {}
