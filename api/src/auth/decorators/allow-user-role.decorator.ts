import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/users/entities/users.entity';

export const AnyRole = 'ANY';

export type AllowedRoles = keyof typeof UserRoles | typeof AnyRole;

export const AllowUserRoles = (roles: AllowedRoles[]) =>
  SetMetadata('roles', roles);
