import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { isAuthGuard } from '../../guards/main/isAuth.guard';
import { isAdminGuard } from '../../guards/main/isAdmin.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(isAuthGuard)
  @UseGuards(isAdminGuard)
  getProfile(@Req() req) {
    return req.user.user;
  }
}
