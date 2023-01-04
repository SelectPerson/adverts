import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';
import { TokensController } from './tokens.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TokensController],
  providers: [TokensService, JwtService],
  imports: [
    SequelizeModule.forFeature([TokensModel]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  exports: [TokensService],
})
export class TokensModule {}
