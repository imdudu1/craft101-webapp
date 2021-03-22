import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findUserById(id: number): Promise<Users> {
    return this.usersRepository.findOne({ id });
  }

  async findUserByUsername(username: string): Promise<Users> {
    return this.usersRepository.findOne({ username });
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const exists = await this.usersRepository
      .createQueryBuilder('users')
      .where('username = :username')
      .orWhere('email = :email')
      .setParameters({
        username: createUserDto.username,
        email: createUserDto.email,
      })
      .getOne();
    if (exists) {
      throw new HttpException(
        'Username OR Email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const user = await this.findUserById(userId);
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
    const result = await this.usersRepository.delete(userId);
    return result.affected > 0;
  }
}
