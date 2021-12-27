import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { Files } from 'src/files/entities/files.entity';
import { CreateUserRequest } from '../dtos/request/create-user.request';
import LoginInput, { LoginOutput } from '../dtos/request/login-user.request';
import { UpdateUserRequest } from '../dtos/request/update-user.request';
import { CreateUserProps, Users } from '../entities/users.entity';
import { Password } from '../entities/vo/password.vo';
import { Email } from '../entities/vo/email.vo';
import { Username } from '../entities/vo/username.vo';
import { Nickname } from '../entities/vo/nickname.vo';
import { UserRepositoryPort } from '../database/user.repository.port';
import { UserTypeormRepository } from '../database/user.typeorm.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserTypeormRepository)
    private readonly usersRepository: UserRepositoryPort,
    private readonly authServices: AuthService,
  ) {}

  getUserById(id: number): Promise<Users> {
    return this.usersRepository.findByUserId(id);
  }

  async createUser(createUserDto: CreateUserRequest): Promise<Users> {
    const { username, email, password, nickname } = createUserDto;

    const newUser: CreateUserProps = {
      email: new Email({ value: email }),
      password: await Password.encrypt(password),
      nickname: new Nickname(nickname),
      username: new Username(username),
    };

    if (
      !(await this.usersRepository.existsByUsernameOrEmail(username, email))
    ) {
      return this.usersRepository.save(newUser);
    }

    throw new HttpException(
      'Username OR Email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  // TODO: 인증 처리 모듈로 이동
  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    // TODO: username으로 이용자 찾기
    const user = await this.usersRepository.findByUsername(username);
    if (!!user && (await user.matchPassword(password))) {
      const token = await this.authServices.createJwt(user.id);
      return {
        ok: true,
        token,
      };
    }
    return {
      ok: false,
      error: 'User not found',
    };
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserRequest,
  ): Promise<Users> {
    const user = await this.usersRepository.findByUserId(userId);
    if (user.isCertifiedUser()) {
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    }
    return null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    return this.usersRepository.delete(userId);
  }

  async editUserAvatar(user: number, avatar: Files) {
    return this.usersRepository.update(user, {
      avatar,
    });
  }
}
