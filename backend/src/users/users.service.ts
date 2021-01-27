import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';
import { CreateUserInput } from './dtos/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserInput } from './dtos/update-user.dto';
import { UserLoginInput, UserLoginOutput } from './dtos/login-user.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({ id });
  }

  async login({
    username,
    password,
  }: UserLoginInput): Promise<UserLoginOutput> {
    const user = await this.usersRepository.findOne({ username });
    if (user !== null && (await argon2.verify(user.password, password))) {
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

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create({
    email,
    username,
    password,
    nickname,
  }: CreateUserInput): Promise<boolean> {
    const queryBuilder = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });
    const isExists = await queryBuilder.getOne();
    if (isExists) {
      const errorMessage = { message: 'Username and Email must be unique.' };
      throw new HttpException(
        {
          errorMessage,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUserEntity = new UserEntity();
    newUserEntity.username = username;
    newUserEntity.email = email;
    newUserEntity.password = password;
    newUserEntity.nickname = nickname;
    const errors = await validate(newUserEntity);
    if (errors.length > 0) {
      const errorMessage = { message: 'Request data is invalied.' };
      throw new HttpException({ errorMessage }, HttpStatus.BAD_REQUEST);
    }
    await this.usersRepository.save(newUserEntity);
    return true;
  }

  async update({ id, data }: UpdateUserInput): Promise<boolean> {
    try {
      this.usersRepository.update(id, { ...data });
      return true;
    } catch (error) {
      return false;
    }
  }
}
