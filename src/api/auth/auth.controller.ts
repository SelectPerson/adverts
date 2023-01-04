import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from '../../core/decorators';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { TokensService } from '../tokens/tokens.service';
import { setCookieJwt } from '../../core/utils/setCookieJwt.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokensService,
  ) {}

  @Public()
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const currentRefreshToken = request?.cookies?.jwt;

    try {
      const result = await this.authService.login(
        loginDto,
        currentRefreshToken,
      );

      if (!currentRefreshToken) {
        await setCookieJwt(response, result.refreshToken);
      }

      return result;
    } catch (e) {
      return 'Auth Error';
    }
  }

  @Public()
  @Post('/register')
  async registration(
    @Body() userDto: CreateUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const currentRefreshToken = request.cookies.jwt;

    try {
      const result = await this.authService.registration(
        userDto,
        currentRefreshToken,
      );

      if (!currentRefreshToken) {
        await setCookieJwt(response, currentRefreshToken);
      }
      return result;
    } catch (e) {
      return 'Register Error';
    }
  }
}
