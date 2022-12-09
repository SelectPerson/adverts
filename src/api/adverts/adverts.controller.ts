import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert-dto';
import { isAuthGuard } from '../../guards/main/isAuth.guard';
import { isAdminGuard } from '../../guards/main/isAdmin.guard';

@Controller('adverts')
export class AdvertsController {
  constructor(private advertsService: AdvertsService) {}

  @UseGuards(isAuthGuard)
  @Post()
  create(@Body() advertDto: CreateAdvertDto, @Req() req) {
    const userId = req.user.user.id;
    return this.advertsService.createAdvert(userId, advertDto);
  }

  @Get()
  getAdvertsAll() {
    return this.advertsService.getAdvertsAll();
  }

  @Get(':id')
  getAdvertsByUserId(@Param('id') id) {
    return this.advertsService.getAdvertsByUserId(id);
  }

  @Post('moderate')
  @UseGuards(isAdminGuard)
  setModerateAdmin(@Body() { id }) {
    return this.advertsService.setModerateAdvert(id);
  }
}
