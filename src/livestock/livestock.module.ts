import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivestockController } from './livestock.controller';
import { LivestockService } from './livestock.service';
import { LiveStock, liveStockModel } from './livestock.model';


@Module({
  //need to import the model here too by using the forFeature method
  imports: [MongooseModule.forFeature([{ name: LiveStock.name, schema: liveStockModel }])],
  controllers: [LivestockController],
  providers: [LivestockService],
})
export class LivestockModule {}
