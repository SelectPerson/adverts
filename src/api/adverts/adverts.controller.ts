import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert-dto';
import { isAuthGuard } from '../../guards/main/isAuth.guard';
import { isAdminGuard } from '../../guards/main/isAdmin.guard';
import { UpdateAdvertDto } from './dto/update-advert-dto';

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

  @Put(':id')
  updateAdvert(@Param('id') id: string, @Body() advertDto: UpdateAdvertDto) {
    return this.advertsService.updateAdvertById(+id, advertDto);
  }

  @UseGuards(isAdminGuard)
  @Put('moderate/:id')
  setModerateAdmin(@Param('id') id, @Body() advertDto: UpdateAdvertDto) {
    return this.advertsService.setModerateAdvert(id, advertDto);
  }
}
