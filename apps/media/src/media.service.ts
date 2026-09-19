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
      myWishField: 'I wanna become invulnerable',
      service: 'media',
      now : new Date().toISOString(),
    }
  }
}
