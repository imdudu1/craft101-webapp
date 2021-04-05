import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { LiveMcService } from './live-mc.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(4001)
export class LiveMcGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly liveMcService: LiveMcService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
