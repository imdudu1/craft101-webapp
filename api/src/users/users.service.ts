import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

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

  // TODO: Update, Delete should be implemented.
}
