import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdvertsModel } from './adverts.model';
import { UsersModel } from '../users/users.model';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@Injectable()
export class AdvertsService {
  constructor(
    @InjectModel(AdvertsModel) private advertRepository: typeof AdvertsModel,
    @InjectModel(UsersModel) private userRepository: typeof UsersModel,
  ) {}

  async createAdvert(userId: number, dto: CreateAdvertDto) {
    const advert = await this.advertRepository.create({ userId, ...dto });
    return {
      status: HttpStatus.OK,
      advert,
    };
  }

  async getAdvertsAll() {
    const adverts = await this.advertRepository.findAll({
      include: { all: true },
    });
    return {
      status: HttpStatus.OK,
      adverts,
    };
  }

  async getAdvertsByUserId(userId) {
    const getAdvertsByUserId = await this.advertRepository.findAll({
      where: {
        userId,
      },
      include: { all: true },
    });
    return {
      status: HttpStatus.OK,
      getAdvertsByUserId,
    };
  }

  async updateAdvertById(id, updateAdvertDto: UpdateAdvertDto) {
    const advert = await this.advertRepository.findOne({ where: { id } });
    const result = await advert.update({ ...advert, ...updateAdvertDto });
    if (advert.isModerated)
      return {
        status: HttpStatus.OK,
        result,
      };
    throw new HttpException(
      'Advert is not moderated by Admin',
      HttpStatus.FORBIDDEN,
    );
  }

  async setModerateAdvert(id, updateAdvertDto: UpdateAdvertDto) {
    let isModerated;

    const advert = await this.advertRepository.findOne({ where: { id } });
    if (!advert.isModerated) isModerated = true;
    const result = await advert.update({
      ...advert,
      isModerated,
      ...updateAdvertDto,
    });

    return {
      status: HttpStatus.OK,
      result,
    };
  }
}
