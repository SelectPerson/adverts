import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';
import { TokensController } from './tokens.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    SequelizeModule.forFeature([TokensModel]),
    forwardRef(() => AuthModule),
  ],
  exports: [TokensService],
})
export class TokensModule {}
