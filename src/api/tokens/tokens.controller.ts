import { Body, Controller, Post } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Public } from '../../core/decorators/public.decorator';

@Controller('tokens')
export class TokensController {
  constructor(private tokenService: TokensService) {}

  @Public()
  @Post('/refresh')
  refresh(@Body() refreshTokenDto) {}
}
