import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(CatalogModule);
  // await app.listen(process.env.port ?? 3000);
  process.title = 'search';
  const logger = new Logger('SearchBootstrap');
  const PORT = Number(process.env.SEARCH_TCP_PORT ?? 3005);

  //creating the 1st microservice instance....
  //refer : https://docs.nestjs.com/microservices/basics
  // To instantiate a microservice, use the createMicroservice() method of the NestFactory class: docs
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.TCP,
      options : {
        host: '0.0.0.0',port: PORT
      }
    },
  );
  app.enableShutdownHooks();
  
  await app.listen();
  logger.log(`Search microservice is listening on port ${PORT}`);


}
await bootstrap();
