import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensModel } from './tokens.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokensModel) private tokenRepository: typeof TokensModel,
  ) {}

  async createRefreshToken({ userId, refreshToken }) {
    const result = await this.tokenRepository.create({
      userId,
      refreshToken,
    });

    return {
      status: HttpStatus.OK,
      result,
    };
  }
}
