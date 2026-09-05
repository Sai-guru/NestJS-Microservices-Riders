import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(CatalogModule);
  // await app.listen(process.env.port ?? 3000);
  process.title = 'media';
  const logger = new Logger('MediaBootstrap');
  const PORT = Number(process.env.MEDIA_TCP_PORT ?? 4001);
  
  // stage 2
  //after rabbitmq setup....TCP to rabbitmq transport change
//each service has its own queue, so that it can listen to the messages from other services
//https://docs.nestjs.com/microservices/rabbitmq
  const rmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const queueName = process.env.MEDIA_QUEUE ?? 'media_queue';


   //stage 1
  //creating the 1st microservice instance....
  //refer : https://docs.nestjs.com/microservices/basics
  // To instantiate a microservice, use the createMicroservice() method of the NestFactory class: docs
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
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
  // logger.log(`Media microservice is listening on port ${PORT}`);
  //start our rabbitmq-nestjs-microservices container in portainer(or docker desktop) and then run this media service, then you will see the below log in the console
  logger.log(`Media RMQ is listening on queue ${queueName} via ${rmqUrl}`);

}
await bootstrap();
