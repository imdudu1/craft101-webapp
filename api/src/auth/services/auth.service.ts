import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwt(id: number): Promise<string> {
    return this.jwtService.sign({ id });
  }

  async verifyJwt(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async decodeJwt(jwt: string) {
    return this.jwtService.decode(jwt);
  }
}
