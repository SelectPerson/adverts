import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { AdvertsModel } from '../adverts/adverts.model';
import { UsersMiddleware } from './users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([UsersModel, AdvertsModel])],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(UsersMiddleware).forRoutes({
      path: 'users/admins',
      method: RequestMethod.GET,
    });
  }
}
