import { iAdvert } from '../../../types/Adverts/Advert';
import { IsString } from 'class-validator';

export class CreateAdvertDto implements iAdvert {
  readonly id: number;
  @IsString()
  title: string;
  @IsString()
  readonly description: string;
  readonly byUser: number;
  readonly userId: number;
  readonly isModerated: boolean;
}
