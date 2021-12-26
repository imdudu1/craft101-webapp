import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './user.repository.port';
import {
  CreateUserProps,
  UpdateUserProps,
  Users,
} from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Username } from '../entities/vo/username.vo';

@Injectable()
export class UserTypeormRepository implements UserRepositoryPort {
  private readonly repository: Repository<Users>;

  constructor(@InjectRepository(Users) repository: Repository<Users>) {
    this.repository = repository;
  }

  findByUsername(username: string): Promise<Users> {
    return this.findOne({ username: new Username(username) });
  }

  async exists(username: string, email: string): Promise<boolean> {
    const isExistsQuery = (query: string) =>
      `SELECT EXISTS(${query}) AS "exists"`;
    const [{ exists }] = await this.repository.manager.query(
      isExistsQuery(
        this.repository.manager
          .createQueryBuilder()
          .select('*')
          .from(Users, 'tbl')
          .where('tb1.emailValue = ? OR tb1.username = ?')
          .getQuery(),
      ),
      [email, username],
    );
    return exists;
  }

  findByUserId(id: number): Promise<Users> {
    return this.findOne({ id });
  }

  save(user: CreateUserProps): Promise<Users> {
    return this.repository.save(this.repository.create(user));
  }

  async delete(id: number): Promise<boolean> {
    // TODO: 사용자 삭제시 수행 결과 반환
    this.repository.delete(id);
    return true;
  }

  existsByUsernameOrEmail(username: string, email: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  async update(id: number, updatedUser: UpdateUserProps): Promise<Users> {
    const user = await this.findOne({ id });
    Object.assign(user, updatedUser);
    return this.save(user);
  }

  private findOne(condition: FindConditions<Users>): Promise<Users> {
    return this.repository.findOne(condition);
  }
}
