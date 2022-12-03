import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private userRepository: typeof UsersModel,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const user = this.userRepository.findAll({
      include: { all: true },
    });
    return user;
  }
}
