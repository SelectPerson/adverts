import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Command, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
@Update()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private userRepository: typeof UsersModel,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    console.log('ctx', ctx.message.chat);
    await ctx.reply('Hello world I');
  }

  @Command('/getId')
  async getId(ctx: Context) {
    console.log('ctx', ctx.message.chat);
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create({ ...dto });

    const idsAdmin = ['483006542'];

    for (let i = 0; i < idsAdmin.length; i++) {
      await this.bot.telegram.sendMessage(
        idsAdmin[i],
        `User created ${JSON.stringify(user.dataValues)}`,
      );
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getAllUsers() {
    const user = await this.userRepository.findAll({
      include: { all: true },
    });
    return user;
  }
}
