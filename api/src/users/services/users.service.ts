import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { Files } from 'src/files/entities/files.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import LoginInput, { LoginOutput } from '../dtos/login-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly authServices: AuthService,
  ) {}

  async findUsers(conditions: FindConditions<Users>) {
    return this.usersRepository.find(conditions);
  }

  async findUser(conditions: FindConditions<Users>) {
    return this.usersRepository.findOne(conditions);
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { username, email } = createUserDto;
    const exists = await this.usersRepository
      .createQueryBuilder('users')
      .where('username = :username')
      .orWhere('email = :email')
      .setParameters({
        username,
        email,
      })
      .getOne();
    if (exists) {
      throw new HttpException(
        'Username OR Email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.usersRepository.findOne({ username });
    const isValid = user?.checkPassword(password);
    if (!isValid) {
      return {
        ok: false,
        error: 'User not found',
      };
    }
    const token = await this.authServices.createJwt(user.id);
    return {
      ok: true,
      token,
    };
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const user = await this.usersRepository.findOne({ id: userId });
    if (user.certifyEmail && updateUserDto.email) {
      user.certifyEmail = updateUserDto.email === user.email;
    }
    if (user) {
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    }
    return null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const deleteResult = await this.usersRepository.delete(userId);
    return deleteResult.affected > 0;
  }

  async editUserAvatar(user: number, avatar: Files) {
    return this.usersRepository.update(user, {
      avatar,
    });
  }
}
