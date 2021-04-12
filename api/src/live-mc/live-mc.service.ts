import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { StatusOptions } from 'minecraft-server-util/dist/model/Options';
import { McStatusOutputDto } from './dtos/mc-status-output.dto';
import { StatusResponse } from 'minecraft-server-util/dist/model/StatusResponse';
import * as msc from 'minecraft-server-util';

@Injectable()
export class LiveMCService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getMCServerStatus(
    host: string,
    options?: StatusOptions,
  ): Promise<McStatusOutputDto> {
    let value = await this.cacheManager.get<StatusResponse>(host);
    if (!value) {
      try {
        value = await msc.status(host, options);
        await this.cacheManager.set<StatusResponse>(host, value, { ttl: 180 });
      } catch (e) {
        return {
          ok: false,
          error: 'This server is currently unreachable.',
        };
      }
    }
    return {
      ok: true,
      status: {
        ...value,
        description: value.description.toString(),
      },
    };
  }
}
