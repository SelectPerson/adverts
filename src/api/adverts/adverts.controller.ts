import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert-dto';
import { IsAdminGuard } from '../../guards/main/isAdmin.guard';

@Controller('adverts')
export class AdvertsController {
  constructor(private advertsService: AdvertsService) {}

  @Post()
  create(@Body() advertDto: CreateAdvertDto) {
    return this.advertsService.createAdvert(advertDto);
  }

  @UseGuards(IsAdminGuard)
  @Get()
  getAdvertsAll() {
    return this.advertsService.getAdvertsAll();
  }

  @Get(':id')
  getAdvertsByUserId(@Param('id') id) {
    return this.advertsService.getAdvertsByUserId(id);
  }

  @Post('moderate')
  setModerateAdmin(@Body() { id }) {
    return this.advertsService.setModerateAdvert(id);
  }
}
