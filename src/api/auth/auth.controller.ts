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
    try {
      const result = await this.authService.login(
        loginDto,
        request.cookies.jwt,
      );
      await setCookieJwt(response, result.refreshToken);
      return result;
    } catch (e) {
      return e;
    }
  }

  @Public()
  @Post('/register')
  async registration(
    @Body() userDto: CreateUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const result = await this.authService.registration(
        userDto,
        request.cookies.jwt,
      );
      await setCookieJwt(response, result.refreshToken);
      return result;
    } catch (e) {
      return e;
    }
  }
}
