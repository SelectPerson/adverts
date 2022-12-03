import { iAdvert } from '../../../types/Adverts/Advert';

export class CreateAdvertDto implements iAdvert {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly byUser: number;
  readonly byModerated: string;
  readonly isModerated: boolean;
}
