import {
  CreateUserProps,
  UpdateUserProps,
  Users,
} from '../entities/users.entity';

export interface UserRepositoryPort {
  save(user: CreateUserProps): Promise<Users>;
  findByUserId(id: number): Promise<Users>;
  findByUsername(username: string): Promise<Users>;
  existsByUsernameOrEmail(username: string, email: string): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  update(id: number, update: UpdateUserProps): Promise<Users>;
}
