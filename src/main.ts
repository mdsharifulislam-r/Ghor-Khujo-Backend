import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookireParser from 'cookie-parser'
import * as dotenv from "dotenv"

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookireParser())
  app.enableCors({origin:"https://ghor-khujo.vercel.app",credentials:true})
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
