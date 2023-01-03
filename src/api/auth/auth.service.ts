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
import { JwtPayload } from '../../types/Auth/JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokensService,
  ) {}

  async login(validateDto: LoginDto) {
    const user = await this.validateUser(validateDto);

    if (!user?.id && !user?.email) throw HttpStatus.BAD_REQUEST;

    const generateTokens = await this.generateTokens(user);

    return generateTokens;
  }

  async registration(userDto: CreateUserDto) {
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

    const generateTokens = await this.generateTokens(user);

    return {
      status: HttpStatus.OK,
      user,
      tokens: generateTokens,
    };
  }

  private async generateTokens(user: UsersModel) {
    const userPayload = { ...user.dataValues };
    delete userPayload.password;

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(userPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      }),

      this.jwtService.signAsync(userPayload, {
        secret: process.env.SECRET_TOKEN_SECRET,
        expiresIn: process.env.SECRET_TOKEN_EXPIRED,
      }),
    ]);

    await this.tokenService.createRefreshToken({
      userId: user.id,
      refreshToken: rt,
    });

    return {
      status: HttpStatus.OK,
      user: userPayload,
      access_token: at,
      refresh_token: rt,
    };
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

  async refreshToken() {
    return 'refresh token';
  }
}
