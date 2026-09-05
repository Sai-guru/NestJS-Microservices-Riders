import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {

  // getHello(): string {
  //   return 'Hello World!';
  // }

  ping(): any {

    return {
      ok: true,
      cool:'good',
      service: 'media',
      now : new Date().toISOString(),
    }
  }
}
