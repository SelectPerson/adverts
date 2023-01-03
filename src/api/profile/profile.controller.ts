import { Controller, Get, Req } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor() {}

  @Get()
  getProfile(@Req() req) {
    return req.user;
  }
}
