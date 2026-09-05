import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module.js';
import { Logger } from '@nestjs/common';



async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');
  const app = await NestFactory.create(GatewayModule)

  const Port = Number(process.env.GATEWAY_PORT ?? 4000);
  app.enableShutdownHooks();

  // app.setGlobalPrefix('api');
  logger.log(`Gateway is listening on port ${Port}`);
  await app.listen(Port);

}
await bootstrap();
