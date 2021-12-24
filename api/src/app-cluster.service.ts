import { Injectable } from '@nestjs/common';
import * as cluster from 'cluster';

@Injectable()
export class AppClusterService {
  static clusterize(bootstrap: () => Promise<void>, debug: boolean): void {
    const numCores = 1; // debug ? 1 : os.cpus().length;
    if (cluster.isMaster) {
      for (let i = 0; i < numCores; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
      });
    } else {
      bootstrap();
    }
  }
}
