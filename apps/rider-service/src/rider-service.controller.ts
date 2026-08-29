import { Controller, Get } from '@nestjs/common';
import { RiderServiceService } from './rider-service.service.js';

@Controller()
export class RiderServiceController {
  constructor(private readonly riderServiceService: RiderServiceService) {}

  @Get()
  getHello(): string {
    return this.riderServiceService.getHello();
  }
}
