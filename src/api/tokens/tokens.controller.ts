import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Public } from '../../core/decorators';
import { RtGuard } from '../../core/guards/tokens';
import { AuthService } from '../auth/auth.service';

@Controller('tokens')
export class TokensController {
  constructor(
    private tokenService: TokensService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(@Req() request) {
    if (request.cookies.jwt) {
      const user = request.user;
      delete user.exp;
      delete user.iat;
      delete user.refreshToken;
      return await this.authService.generateTokens(user, request.cookies.jwt);
    }
  }
}
