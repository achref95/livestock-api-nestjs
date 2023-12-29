import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { JwtStrategy } from './middleware/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LivestockModule } from './livestock/livestock.module';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';



@Module({
  imports: [ConfigModule.forRoot(), // Used to load environment variables, replaces the dotenv.config();
            DatabaseModule, 
            AuthModule,
            LivestockModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtAuthGuard], // Since the guard and strategy can be injected, they need to be put as providers
})
export class AppModule {}
