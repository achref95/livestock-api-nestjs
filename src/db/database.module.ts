import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/livestock-server'),
  ],
})
export class DatabaseModule implements OnModuleInit {
  onModuleInit() {
    console.log('Connected to MongoDB!');
  }
}
