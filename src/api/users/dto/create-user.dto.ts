import { iUser, userRoleTypes } from '../../../types/User/User';

export class CreateUserDto implements iUser {
  readonly email: string;
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly role: userRoleTypes;
  readonly password: string;
}
