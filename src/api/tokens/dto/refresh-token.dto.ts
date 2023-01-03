import { iUser } from '../../../types/User/User';
import { IsString } from 'class-validator';

export class RefreshTokenDto implements iUser {
  readonly id: number;
  readonly email: string;
  @IsString()
  readonly password: string;
}
