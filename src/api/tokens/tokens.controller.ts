import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Public } from '../../core/decorators/public.decorator';
import { RtGuard } from '../../core/guards/tokens';

@Controller('tokens')
export class TokensController {
  constructor(private tokenService: TokensService) {}

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  refresh(@Body() refreshTokenDto) {
    return 1;
  }
}
