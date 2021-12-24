import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { Files } from 'src/files/entities/files.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import LoginInput, { LoginOutput } from '../dtos/login-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserProps, Users } from '../entities/users.entity';
import { Password } from '../entities/vo/password.vo';
import { Email } from '../entities/vo/email.vo';
import { Username } from '../entities/vo/username.vo';
import { Nickname } from '../entities/vo/nickname.vo';

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
    const getUserOneByUsernameAndEmail = (username: string, email: string) => {
      return (
        this.usersRepository
          .createQueryBuilder('users')
          // TODO: 컬럼명 매칭 오류 제거
          .where('usernameValue = :username')
          .orWhere('emailValue = :email')
          .setParameters({
            username,
            email,
          })
          .getOne()
      );
    };
    const { username, email, password, nickname } = createUserDto;

    const newUser: CreateUserProps = {
      email: new Email({ value: email }),
      password: new Password(password),
      nickname: new Nickname(nickname),
      username: new Username(username),
    };

    if (!!!(await getUserOneByUsernameAndEmail(username, email))) {
      return this.usersRepository.save(this.usersRepository.create(newUser));
    }

    throw new HttpException(
      'Username OR Email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  // TODO: 인증 처리 이동
  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    // TODO: username으로 이용자 찾기
    const user = await this.usersRepository.findOne(1);
    if (!!user && user.matchPassword(password)) {
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
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const user = await this.usersRepository.findOne({ id: userId });
    if (user.isCertifiedUser()) {
      // TODO: 사용자 정보 수정 로직 추가
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
