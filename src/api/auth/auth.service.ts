import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersModel } from '../users/users.model';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokensService,
  ) {}

  async login(validateDto: LoginDto, currentRefreshToken) {
    const user = await this.validateUser(validateDto);

    if (!user?.id && !user?.email) throw HttpStatus.BAD_REQUEST;

    return await this.generateTokens(user.dataValues, currentRefreshToken);
  }

  async registration(userDto: CreateUserDto, currentRefreshToken) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'The email has already been taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return await this.generateTokens(user.dataValues, currentRefreshToken);
  }

  private async validateUser(validateDto: LoginDto | RegisterDto) {
    const user = await this.userService.getUserByEmail(validateDto.email);
    const passwordEquals = await bcrypt.compare(
      validateDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Wrong email or password',
    });
  }

  async generateTokens(user: UsersModel, currentRefreshToken) {
    const userPayload = { ...user };
    delete userPayload.password;

    console.log('currentRefreshToken', currentRefreshToken);

    const at = await this.jwtService.signAsync(userPayload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
    });

    let rt;

    if (currentRefreshToken) {
      rt = await currentRefreshToken;
    } else {
      rt = await this.jwtService.signAsync(userPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
      });

      await this.tokenService.releaseRefreshToken({
        userId: user.id,
        refreshToken: rt,
      });
    }

    return {
      status: HttpStatus.OK,
      user: userPayload,
      accessToken: at,
      refreshToken: rt,
    };
  }
}
