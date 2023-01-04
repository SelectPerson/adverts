import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Public } from '../../core/decorators';
import { RtGuard } from '../../core/guards/tokens';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { setCookieJwt } from '../../core/utils/setCookieJwt.utils';
import { Response, response } from 'express';

@Controller('tokens')
export class TokensController {
  constructor(
    private tokenService: TokensService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request?.cookies?.jwt;

    if (!refreshToken)
      throw new HttpException('Refresh token not found', HttpStatus.FORBIDDEN);

    const userId = request.user.id;
    const getUser = await this.userService.getUserById(userId);
    const result = await this.authService.generateTokens(
      getUser.dataValues,
      refreshToken,
    );

    await setCookieJwt(response, refreshToken);

    return result;
  }
}
