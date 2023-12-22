import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set('trust proxy', 1);

  const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";


  // Enable CORS and allow all origins
  const corsOptions: CorsOptions = {
    origin: [FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT);
}

bootstrap();
