import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  
  // getHello(): string {
  //   return 'Hello World!';
  // }

  ping(): any {

    return {
      ok: true,
      cool:'good',
      service: 'search',
      now : new Date().toISOString(),
    }
  }
}
