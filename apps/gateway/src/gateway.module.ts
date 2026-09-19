import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller.js';
import { GatewayService } from './gateway.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      //service 1
      {
        name: 'CATALOG_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [ process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          queue: process.env.CATALOG_QUEUE ?? 'catalog_queue',
          queueOptions: {
            durable: false
          },
        },
      },

      //service 2
            {
        name: 'SEARCH_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [ process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          queue: process.env.SEARCH_QUEUE ?? 'search_queue',
          queueOptions: {
            durable: false
          },
        },
      },

      //service 3
            {
        name: 'MEDIA_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [ process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          queue: process.env.MEDIA_QUEUE ?? 'media_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
