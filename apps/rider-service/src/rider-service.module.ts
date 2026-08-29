import { Module } from '@nestjs/common';
import { RiderServiceController } from './rider-service.controller.js';
import { RiderServiceService } from './rider-service.service.js';

@Module({
  imports: [],
  controllers: [RiderServiceController],
  providers: [RiderServiceService],
})
export class RiderServiceModule {}
