import { Module } from '@nestjs/common';
import { LoggingServiceController } from './logging-service.controller.js';
import { LoggingServiceService } from './logging-service.service.js';

@Module({
  imports: [],
  controllers: [LoggingServiceController],
  providers: [LoggingServiceService],
})
export class LoggingServiceModule {}
