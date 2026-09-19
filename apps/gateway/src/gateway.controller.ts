import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service.js';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  // constructor(private readonly gatewayService: GatewayService) {}
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
    private readonly gatewayService: GatewayService,
  ) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  // @Get('/health')
  // healthCheck(): any {

  //   return {
  //    ok: true,
  //     service: 'Gateway Service',
  //     timestamp: new Date().toLocaleDateString(),
  //   }
  // }

  @Get('health')
  async health() {
    const ping  = async (serviceName : string,client : ClientProxy) => {
      try{

        const result = await firstValueFrom(
          client.send(`service.${serviceName}.ping`, {from: 'gateway'}),
        )
        return {
          ok:true,
          service: serviceName,
          result
        }


      }catch(err : any){
        return {
          ok : false,
          service: serviceName,
          error: err.message,
        }
      }
    }

       const [catalog, search, media] = await Promise.all([
        ping('catalog', this.catalogClient),
        ping('search', this.searchClient),
        ping('media', this.mediaClient),
      ])

      const ok = [catalog, search, media].every((res) => res.ok);
      return {
        ok,
        gateway: {
          service: 'gateway',
          timestamp: new Date().toISOString(),
        },
        services:{catalog, search, media},
      }
    }

  }

