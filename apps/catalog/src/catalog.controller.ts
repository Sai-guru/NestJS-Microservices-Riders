import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // @Get('health')
  // getHello(): string {
  //   return this.catalogService.getHello();
  // }

  @MessagePattern('service.catalog.ping')
  ping(): any {
    return this.catalogService.ping();
  }
}
