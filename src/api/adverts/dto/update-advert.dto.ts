import { CreateAdvertDto } from './create-advert.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAdvertDto extends PartialType(CreateAdvertDto) {}
