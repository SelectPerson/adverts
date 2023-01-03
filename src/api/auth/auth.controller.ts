import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from '../../core/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { RtGuard } from '../../core/guards/tokens';
import { GetCurrentUserId } from '../../core/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from '../../core/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);
    // await response.cookie('jwt', result.refresh_token, {
    //   httpOnly: true,
    //   maxAge: 30 * 24 * 60 * 1000,
    // });
    return result;
  }

  @Public()
  @Post('/register')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  refresh() {
    return 1;
  }
}
