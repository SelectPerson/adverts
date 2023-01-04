import { IsString } from 'class-validator';

export class CreateTypeImageDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}
