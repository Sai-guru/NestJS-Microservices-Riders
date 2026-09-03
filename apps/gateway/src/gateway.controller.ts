import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service.js';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Get('/health')
  healthCheck(): any {

    return {
     ok: true,
      service: 'Gateway Service',
      timestamp: new Date().toLocaleDateString(),
    }
  }
}
