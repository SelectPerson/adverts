import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  async getProfile(profile) {
    return {
      status: HttpStatus.OK,
      profile,
    };
  }
}
