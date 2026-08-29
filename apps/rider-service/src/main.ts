import { NestFactory } from '@nestjs/core';
import { RiderServiceModule } from './rider-service.module.js';

const riderServicePort = process.env.port ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(RiderServiceModule);
  await app.listen(process.env.port ?? 3001);
  console.log(`Rider service is running on: ${riderServicePort}`);
}
await bootstrap();
