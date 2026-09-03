import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  // const app = await NestFactory.create(CatalogModule);
  // await app.listen(process.env.port ?? 3000);
  process.title = 'catalog';
  const logger = new Logger('CatalogBootstrap');
  const PORT = Number(process.env.CATALOG_TCP_PORT ?? 3003);

  //creating the 1st microservice instance....
  //refer : https://docs.nestjs.com/microservices/basics
  // To instantiate a microservice, use the createMicroservice() method of the NestFactory class: docs
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.TCP,
      options : {
        host: '0.0.0.0',port: PORT
      }
    },
  );
  app.enableShutdownHooks();
  
  await app.listen();
  logger.log(`Catalog microservice is listening on port ${PORT}`);


}
await bootstrap();



