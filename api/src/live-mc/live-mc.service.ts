import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { StatusOptions } from 'minecraft-server-util/dist/model/Options';
import { McStatusOutputDto } from './dtos/mc-status-output.dto';
import * as msc from 'minecraft-server-util';
import { MCStatus } from './types/mc-status.type';

@Injectable()
export class LiveMCService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getMCServerStatus(
    host: string,
    options?: StatusOptions,
  ): Promise<McStatusOutputDto> {
    let value = await this.cacheManager.get<MCStatus>(host);
    if (!value) {
      try {
        const status = await msc.status(host, options);
        value = Object.assign(new MCStatus(), {
          ...status,
          description: status.description.toString(),
        });
        await this.cacheManager.set<MCStatus>(host, value, { ttl: 180 });
      } catch (e) {
        return {
          ok: false,
          error: 'This server is currently unreachable.',
        };
      }
    }
    return {
      ok: true,
      status: value,
    };
  }
}
