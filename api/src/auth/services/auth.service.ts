import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Profile } from 'passport';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  AccountType,
  UserRoles,
  Users,
} from '../../users/entities/users.entity';
import { UsersService } from '../../users/users.service';
import { CertifyEmailCodes } from './../entities/certify-email-code.entity';
import { OAuthTokens } from './../entities/oauth-tokens.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OAuthTokens)
    private readonly authTokensRepository: Repository<OAuthTokens>,
    @InjectRepository(CertifyEmailCodes)
    private readonly certifyEmailCodesRepository: Repository<CertifyEmailCodes>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser(
    username: string,
    password: string,
  ): Promise<string | null> {
    const user = await this.usersService.findUserByUsername(username);
    if (user) {
      const isValid = await user.checkPassword(password);
      if (user && isValid) {
        return this.createJwt(user.id);
      }
    }
    return null;
  }

  //--START: OAuth2
  async validateKakaoUser({ id, displayName }: Profile) {
    const tempUsername = `kakao@${id}`;
    let user = await this.usersService.findUserByUsername(tempUsername);
    if (!user) {
      const newUser = new Users();
      newUser.username = tempUsername;
      newUser.nickname = displayName;
      newUser.password = uuidv4();
      newUser.role = UserRoles.USER;
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
    await this.authTokensRepository.save(updated);
  }
  //--END: OAuth2

  //--START: Jsonwebtoken
  async createJwt(id: number): Promise<string> {
    return this.jwtService.sign(`${id}`);
  }

  async verifyJwt(jwt: string): Promise<Users> {
    const userId: number = +this.jwtService.verify(jwt);
    return this.usersService.findUserById(userId);
  }

  async decodeJwt(jwt: string) {
    return this.jwtService.decode(jwt);
  }
  //--END: Jsonwebtoken

  //--START: Certify E-mail
  async generateCertifyEmailCode(userId: number): Promise<boolean> {
    const user = await this.usersService.findUserById(userId);
    const code = crypto.randomInt(110101, 999999);
    if (!user.certifyEmail) {
      const certifyEmailCode = this.certifyEmailCodesRepository.create({
        user,
        code,
      });
      await this.certifyEmailCodesRepository.save(certifyEmailCode);
      return true;
    }
    return false;
  }

  async verifyCertifyEmailCode(userId: number, code: number): Promise<boolean> {
    const user = await this.usersService.findUserById(userId);
    const certifyEmailCode = await this.certifyEmailCodesRepository.findOne({
      user,
    });
    if (certifyEmailCode.code === code) {
      user.certifyEmail = true;
      await this.usersService.updateUser(user.id, user);
      await this.deleteCertifyEmailCode(certifyEmailCode.id);
      return true;
    }
    return false;
  }

  async deleteCertifyEmailCode(id: number): Promise<boolean> {
    const result = await this.certifyEmailCodesRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Certify E-mail
}
