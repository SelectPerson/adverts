import { Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert-dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdvertsModel } from './adverts.model';
import { UsersModel } from '../users/users.model';

@Injectable()
export class AdvertsService {
  constructor(
    @InjectModel(AdvertsModel) private advertRepository: typeof AdvertsModel,
    @InjectModel(UsersModel) private userRepository: typeof UsersModel,
  ) {}

  async createAdvert(dto: CreateAdvertDto) {
    const advert = await this.advertRepository.create(dto);
    return advert;
  }

  async getAdvertsAll() {
    const adverts = await this.advertRepository.findAll({
      include: { all: true },
    });
    return adverts;
  }

  async getAdvertsByUserId(userId) {
    const getAdvertsByUserId = await this.advertRepository.findAll({
      where: {
        userId,
      },
    });
    return getAdvertsByUserId;
  }

  async setModerateAdvert(userId) {
    const getUserId = this.userRepository.findOne({ where: { id: userId } });
    return getUserId;
  }
}
