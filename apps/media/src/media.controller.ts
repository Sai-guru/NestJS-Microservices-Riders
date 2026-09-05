import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service.js';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  //   @Get('health')
  // getHello(): string {
  //   return this.mediaService.getHello();
  // }

  @MessagePattern('service.media.ping')
  ping(): any {
    return this.mediaService.ping();
  }
  
}
