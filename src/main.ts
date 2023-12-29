import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted on a server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set('trust proxy', 1);

  // Responsible for http requests console logs in dev mode
  const logger = morgan('dev');
  app.use(logger);

  const FRONTEND_URL = process.env.ORIGIN;

  // Enable CORS and allow all origins
  const corsOptions: CorsOptions = {
    origin: [FRONTEND_URL],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  };
  app.enableCors(corsOptions);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

bootstrap();
