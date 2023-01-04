import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesModel } from './images.model';
import { ImagesTypeModel } from './images-type.model';
import { AdvertsModel } from '../adverts/adverts.model';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([ImagesModel, ImagesTypeModel, AdvertsModel]),
  ],
})
export class ImagesModule {}
