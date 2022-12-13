import { iUser, userRoleTypes } from '../../../types/User/User';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto implements iUser {
  @IsEmail()
  readonly email: string;
  readonly id: number;
  @IsString()
  readonly name: string;
  @IsString()
  readonly phone: string;
  readonly role: userRoleTypes;
  @IsString()
  readonly password: string;
}
