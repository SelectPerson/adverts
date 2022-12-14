import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModel } from './api/users/users.model';
import { AdvertsModel } from './api/adverts/adverts.model';
import { AdvertsModule } from './api/adverts/adverts.module';
import { AuthModule } from './api/auth/auth.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ProfileModule } from './api/profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './core/guards/tokens';
import { TokensModule } from './api/tokens/tokens.module';
import { ImagesModule } from './api/images/images.module';
import { ImagesModel } from './api/images/images.model';
import { ImagesTypeModel } from './api/images/images-type.model';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [UsersModel, AdvertsModel, ImagesModel, ImagesTypeModel],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),

    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    UsersModule,
    AdvertsModule,
    AuthModule,
    ProfileModule,
    TokensModule,
    ImagesModule,
  ],
})
export class AppModule {}
