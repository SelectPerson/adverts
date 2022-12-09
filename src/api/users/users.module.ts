import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { AdvertsModel } from '../adverts/adverts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([UsersModel, AdvertsModel])],
  exports: [UsersService],
})
export class UsersModule {}
