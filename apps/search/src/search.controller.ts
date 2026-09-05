import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service.js';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // @Get('health')
  // getHello(): string {
  //   return this.searchService.getHello();
  // }

  @MessagePattern('service.search.ping')
  ping(): any {
    return this.searchService.ping();
  }
}
