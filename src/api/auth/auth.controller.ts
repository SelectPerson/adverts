import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from '../../core/decorators';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { TokensService } from '../tokens/tokens.service';
import { setCookieJwt } from '../../core/utils/setCookieJwt.utils';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokensService,
    private jwtService: JwtService,
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
      return new HttpException(
        'Error during log in',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      return new HttpException(
        'Error during registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const currentRefreshToken = request?.cookies?.jwt;
      const decodeUserToken: any = this.jwtService.decode(currentRefreshToken);

      const userId = decodeUserToken.id;

      await this.tokenService.removeRefreshToken({
        userId,
        refreshToken: currentRefreshToken,
      });
      await response.clearCookie('jwt');
      return {};
    } catch (e) {
      return new HttpException(
        'Error during log out',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
