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
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { iUser } from '../../types/User/User';

@Controller('tokens')
export class TokensController {
  constructor(
    private tokenService: TokensService,
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  // @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const currentRefreshToken = request?.cookies?.jwt;
    if (!currentRefreshToken)
      throw new HttpException('Refresh token not found', HttpStatus.FORBIDDEN);
    const decodeUserToken: any = this.jwtService.decode(currentRefreshToken);

    const userId = decodeUserToken.id;
    const getUser = await this.userService.getUserById(userId);
    const result = await this.authService.generateTokens(
      getUser.dataValues,
      currentRefreshToken,
    );

    return result;
    //
    // await setCookieJwt(response, refreshToken);

    // return result;
  }
}
