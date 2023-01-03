import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';

@Module({
  providers: [TokensService],
  imports: [SequelizeModule.forFeature([TokensModel])],
  exports: [TokensService],
})
export class TokensModule {}
