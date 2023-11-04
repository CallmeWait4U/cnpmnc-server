import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
// DATABASE_URL="mongodb+srv://cnpm:48694869@cnpmnc.drtz6gs.mongodb.net/cnpm-database"