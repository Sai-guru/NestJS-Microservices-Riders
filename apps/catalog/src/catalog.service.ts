import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {

  // getHello(): string {
  //   return 'Hello World!';
  // }

  ping(): any {

    return {
      ok: true,
      cool:'good',
      service: 'catalog',
      now : new Date().toISOString(),
    }
  }
}
