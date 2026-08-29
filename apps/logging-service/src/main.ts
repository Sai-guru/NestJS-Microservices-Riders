import { NestFactory } from '@nestjs/core';
import { LoggingServiceModule } from './logging-service.module.js';

const loggingServicePort = process.env.port ?? 3002;

async function bootstrap() {
  const app = await NestFactory.create(LoggingServiceModule);
  await app.listen(process.env.port ?? loggingServicePort);
  console.log(`Logging service is running on: ${loggingServicePort}`);
}
await bootstrap();
