import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LiveMCService } from './live-mc.service';

@WebSocketGateway(4001)
export class LiveMCGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly liveMCService: LiveMCService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
