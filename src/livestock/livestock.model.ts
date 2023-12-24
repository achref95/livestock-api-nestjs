import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LiveStock extends Document {
  @Prop({ required: true, unique: true })
  stockNumber: string;

  @Prop({ required: true })
  stockType: string;

  @Prop({ required: true })
  age: string;

  @Prop()
  comment: string;
}

export const liveStockModel = SchemaFactory.createForClass(LiveStock);

