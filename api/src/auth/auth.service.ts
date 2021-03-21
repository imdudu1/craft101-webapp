import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AccountType, UserRole, Users } from '../users/entities/users.entity';
import { Profile } from 'passport';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthTokens } from './entities/oauth-tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OAuthTokens)
    private readonly authTokensRepository: Repository<OAuthTokens>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const isValid = await user.checkPassword(pass);
    if (user && isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateKakaoUser({ id, displayName }: Profile) {
    const tempUsername = `kakao@${id}`;
    let user = await this.usersService.findUserByUsername(tempUsername);
    if (!user) {
      const newUser = new Users();
      newUser.username = tempUsername;
      newUser.nickname = displayName;
      newUser.password = uuidv4();
      newUser.role = UserRole.USER;
      newUser.accountType = AccountType.KAKAO;
      newUser.email = 'thisuser@sns.account';
      user = await this.usersService.createUser(newUser);
    }
    return user;
  }

  async storeAccessTokens(
    user: Users,
    accessToken: string,
    refreshToken: string,
  ) {
    const toUpdate = await this.authTokensRepository.findOne({ user });
    const updated = new OAuthTokens();
    if (toUpdate) {
      Object.assign(updated, toUpdate);
    }
    updated.accessToken = accessToken;
    updated.refreshToken = refreshToken;
    updated.user = user;
    await this.authTokensRepository.save(updated);
  }

  async createJwt(id: number): Promise<string> {
    return this.jwtService.sign(`${id}`);
  }

  async verifyJwt(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async decodeJwt(jwt: string) {
    return this.jwtService.decode(jwt);
  }
}
