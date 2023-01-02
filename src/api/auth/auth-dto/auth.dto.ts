import { iUser, userRoleTypes } from '../../../types/User/User';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto implements iUser {
  readonly id: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  role: userRoleTypes;
}
