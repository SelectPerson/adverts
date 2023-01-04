import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateTypeImageDto } from './dto/create-type-image.dto';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  async createImage(@Body() dto: CreateImageDto) {
    try {
      const result = await this.imagesService.createImage(dto);

      return {
        status: HttpStatus.OK,
        res: result,
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllImages() {
    try {
      const result = await this.imagesService.getAllImages();
      return {
        status: HttpStatus.OK,
        res: result,
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/type')
  async createTypeForImage(@Body() dto: CreateTypeImageDto) {
    try {
      const result = await this.imagesService.createTypeForImage(dto);

      return {
        status: HttpStatus.OK,
        res: result,
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/type')
  async getAllTypeForImage() {
    try {
      const result = await this.imagesService.getAllTypeForImage();
      return {
        status: HttpStatus.OK,
        res: result,
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
