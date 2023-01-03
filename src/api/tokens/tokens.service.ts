import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokensModel) private tokenRepository: typeof TokensModel,
  ) {}

  async releaseRefreshToken({ userId, refreshToken, currentRefreshToken }) {
    const existingToken = await this.tokenRepository.findOne({
      where: {
        refreshToken: currentRefreshToken,
        userId: userId,
      },
    });

    if (existingToken) {
      await existingToken.update({ ...existingToken, refreshToken });
    } else {
      await this.tokenRepository.create({
        userId,
        refreshToken,
      });
    }

    return {
      status: HttpStatus.OK,
      refreshToken: existingToken,
    };
  }
}
