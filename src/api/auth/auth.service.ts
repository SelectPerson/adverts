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
import { Tokens } from '../../types/Auth/Tokens';
import { JwtPayload } from '../../types/Auth/JwtPayload';
import { AuthDto } from './auth-dto/auth.dto';
import { LoginDto } from './auth/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);

    return this.generateToken(user);
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
    return this.generateToken(user);
  }

  private async generateToken(user: UsersModel) {
    const payload = { ...user.dataValues };
    delete payload.password;

    return {
      status: HttpStatus.OK,
      user: payload,
      token: this.jwtService.sign({
        user: payload,
      }),
    };
  }

  private async validateUser(authDto: LoginDto) {
    const user = await this.userService.getUserByEmail(authDto.email);
    const passwordEquals = await bcrypt.compare(
      authDto.password,
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

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_EXPIRED,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.SECRET_TOKEN_EXPIRED,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
