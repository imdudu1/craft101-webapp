import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as msc from 'minecraft-server-util';
import { MC_SERVER_DEFAULT_PORT } from 'src/constants';
import { McStatusOutputDto } from './dtos/mc-status-output.dto';
import { MCStatus } from './types/mc-status.type';

@Injectable()
export class LiveMCService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getMCServerStatus(host: string): Promise<McStatusOutputDto> {
    const [serverIP, serverPort] = host.split(':');
    let value = await this.cacheManager.get<MCStatus>(host);
    if (!value) {
      try {
        const status = await msc.status(serverIP, {
          port: +serverPort || MC_SERVER_DEFAULT_PORT,
        });
        value = Object.assign(new MCStatus(), {
          ...status,
          // Converted Description Object to string
          description: status.description.toString(),
        });
        await this.cacheManager.set<MCStatus>(host, value, {
          ttl: 180 /* 3 minutes */,
        });
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }
    return {
      ok: true,
      status: value,
    };
  }
}
