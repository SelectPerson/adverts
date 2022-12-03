import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from '../users/users.model';
import { AdvertsModel } from './adverts.model';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';

@Module({
  providers: [AdvertsService],
  controllers: [AdvertsController],
  imports: [SequelizeModule.forFeature([UsersModel, AdvertsModel])],
})
export class AdvertsModule {}
