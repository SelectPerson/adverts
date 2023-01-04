import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  readonly linkImage: string;
  readonly typeId: number;
}
