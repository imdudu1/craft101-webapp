import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';
import { CreateUserInput } from './dtos/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserInput } from './dtos/update-user.dto';
import { UserLoginInput, UserLoginOutput } from './dtos/login-user.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 레포지토리로부터 사용자 계정 탐색
   */
  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user: UserEntity = await this.usersRepository.findOneOrFail({ id });
      return {
        code: HttpStatus.FOUND,
        profile: user,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
      };
    }
  }

  /**
   * 사용자 로그인
   */
  async login({
    username,
    password,
  }: UserLoginInput): Promise<UserLoginOutput> {
    const user: UserEntity = await this.usersRepository.findOne({ username });
    if (user && (await argon2.verify(user.password, password))) {
      const token = this.jwtService.sign(user.id);
      return {
        code: HttpStatus.OK,
        token,
      };
    }
    return {
      code: HttpStatus.UNAUTHORIZED,
    };
  }

  /**
   * 사용자 계정 삭제
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.usersRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 사용자 계정 생성
   */
  async create({
    email,
    username,
    password,
    nickname,
  }: CreateUserInput): Promise<UserProfileOutput> {
    const queryBuilder: SelectQueryBuilder<UserEntity> = getRepository(
      UserEntity,
    )
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });
    const isExists = await queryBuilder.getOne();
    if (isExists) {
      return {
        code: HttpStatus.CONFLICT,
        message: 'Username(or Email) has already been taken',
      };
    }

    const newUserEntity = new UserEntity();
    newUserEntity.username = username;
    newUserEntity.email = email;
    newUserEntity.password = password;
    newUserEntity.nickname = nickname;
    const errors = await validate(newUserEntity);
    if (errors.length > 0) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'Request data is invalid.',
      };
    }

    const newUser = await this.usersRepository.save(newUserEntity);
    return {
      code: HttpStatus.CREATED,
      profile: newUser,
    };
  }

  /**
   * 사용자 계정 정보 수정
   */
  async update({ id, data }: UpdateUserInput): Promise<boolean> {
    try {
      await this.usersRepository.update(id, { ...data });
      return true;
    } catch (error) {
      return false;
    }
  }
}
