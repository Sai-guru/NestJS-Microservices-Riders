import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller.js';
import { GatewayService } from './gateway.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [

    //load our env 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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

    //connect our MongoDB 
    MongooseModule.forRoot(process.env.MONGO_URI_USERS as string),
    //other modules
    UsersModule,AuthModule

  
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
