import { iUser } from '../../../types/User/User';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto implements iUser {
  readonly id: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
