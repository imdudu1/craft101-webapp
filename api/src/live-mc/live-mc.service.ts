import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';

@Injectable()
export class LiveMcService {
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    /* empty */
  }
}
