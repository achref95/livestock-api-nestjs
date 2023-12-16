import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { JwtStrategy } from './middleware/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LivestockModule } from './livestock/livestock.module';


@Module({
  imports: [AuthModule,
            DatabaseModule, 
            ConfigModule.forRoot(), 
            LivestockModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
