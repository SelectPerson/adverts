import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { Public } from '../../core/decorators/public.decorator';

@Controller('adverts')
export class AdvertsController {
  constructor(private advertsService: AdvertsService) {}

  @Public()
  @Get('test')
  test(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session.visits;
  }

  @Post()
  create(@Body() advertDto: CreateAdvertDto, @Req() req) {
    const userId = req.user.id;
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

  @Put('moderate/:id')
  setModerateAdmin(@Param('id') id, @Body() advertDto: UpdateAdvertDto) {
    return this.advertsService.setModerateAdvert(id, advertDto);
  }
}
