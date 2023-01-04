import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTypeImageDto } from './dto/create-type-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ImagesTypeModel } from './images-type.model';
import { ImagesModel } from './images.model';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(ImagesTypeModel)
    private imagesTypeRepository: typeof ImagesTypeModel,
    @InjectModel(ImagesModel)
    private imagesRepository: typeof ImagesModel,
  ) {}

  async createTypeForImage(dto: CreateTypeImageDto) {
    const imageType = await this.imagesTypeRepository.create({ ...dto });

    return imageType;
  }

  async getAllTypeForImage() {
    const getAllTypeForImage = await this.imagesTypeRepository.findAll();
    return getAllTypeForImage;
  }

  async createImage(dto: CreateImageDto) {
    const createImage = await this.imagesRepository.create({ ...dto });
    return createImage;
  }

  async getAllImages() {
    const getImages = await this.imagesRepository.findAll({
      include: { all: true },
    });
    return getImages;
  }
}
