import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as msc from 'minecraft-server-util';
import { Articles } from 'src/articles/entities/articles.entity';
import { ArticlesService } from 'src/articles/services/articles/articles.service';
import { MC_SERVER_DEFAULT_PORT } from 'src/constants';
import { Repository } from 'typeorm';
import { McStatusOutputDto } from '../dtos/mc-status-output.dto';
import { PlayerHistories } from '../entities/player-histories.entity';
import { MCStatus } from '../types/mc-status.type';

@Injectable()
export class LiveMCService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(PlayerHistories)
    private readonly playerHistoriesRepository: Repository<PlayerHistories>,
    private readonly articlesService: ArticlesService,
  ) {}

  async getMCServerStatus(host: string): Promise<McStatusOutputDto> {
    const [serverIP, serverPort] = host.split(':');
    let status = await this.cacheManager.get<MCStatus>(host);
    if (!status) {
      try {
        const currentStatus = await msc.status(serverIP, {
          port: +serverPort || MC_SERVER_DEFAULT_PORT,
        });
        status = Object.assign(new MCStatus(), {
          ...currentStatus,
          // Converted Description Object to string
          description: currentStatus.description.toString(),
        });
        await this.cacheManager.set<MCStatus>(host, status, {
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
      status,
    };
  }

  async createPlayerHistory(article: Articles, onlinePlayers: number) {
    const newHistory = this.playerHistoriesRepository.create({
      article,
      onlinePlayers,
    });
    return this.playerHistoriesRepository.save(newHistory);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkMCServerStatus() {
    const adArticles = await this.articlesService.allAdArticles();
    await Promise.all(
      adArticles.map(async (adArticle) => {
        const { host } = adArticle;
        const { ok, status } = await this.getMCServerStatus(host);
        let currentOnlinePlayers = 0;
        if (ok) {
          currentOnlinePlayers = status.onlinePlayers;
        }
        await this.createPlayerHistory(adArticle, currentOnlinePlayers);
      }),
    );
  }
}
