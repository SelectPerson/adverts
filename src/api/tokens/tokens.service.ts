import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokensModel) private tokenRepository: typeof TokensModel,
  ) {}

  async releaseRefreshToken({ userId, refreshToken }) {
    await this.tokenRepository.create({
      userId,
      refreshToken,
    });
  }

  async removeRefreshToken({ userId, refreshToken }) {
    const getToken = await this.tokenRepository.findOne({
      where: {
        userId,
        refreshToken,
      },
    });
  }
}
