import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  // const app = await NestFactory.create(CatalogModule);
  // await app.listen(process.env.port ?? 3000);
  process.title = 'catalog';
  const logger = new Logger('CatalogBootstrap');
  const PORT = Number(process.env.CATALOG_TCP_PORT ?? 4003);

  // stage 2
  //after rabbitmq setup....TCP to rabbitmq transport change
//each service has its own queue, so that it can listen to the messages from other services
//https://docs.nestjs.com/microservices/rabbitmq
  const rmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const queueName = process.env.CATALOG_QUEUE ?? 'catalog_queue';


  //  stage 1
  //creating the 1st microservice instance....
  //refer : https://docs.nestjs.com/microservices/basics
  // To instantiate a microservice, use the createMicroservice() method of the NestFactory class: docs
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    // {
    //   transport: Transport.TCP,
    //   options : {
    //     host: '0.0.0.0',port: PORT
    //   }
    // },
    {
    transport: Transport.RMQ,
  options: {
    urls: [rmqUrl],
    queue: queueName,
    queueOptions: {
      durable: false
    },
  },

});
  app.enableShutdownHooks();
  
  await app.listen();
  // logger.log(`Catalog microservice is listening on port ${PORT}`);
  //start our rabbitmq-nestjs-microservices container in portainer(or docker desktop) and then run this catalog service, then you will see the below log in the console
  logger.log(`Catalog RMQ is listening on queue ${queueName} via ${rmqUrl}`);
  
}


await bootstrap();



