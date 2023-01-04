import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { iUser, userRoleTypes } from '../../types/User/User';
import { AdvertsModel } from '../adverts/adverts.model';

@Table({ tableName: 'users' })
export class UsersModel extends Model implements iUser {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  role: userRoleTypes;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => AdvertsModel)
  adverts: AdvertsModel[];

  @Column({
    type: DataType.INTEGER,
  })
  telegramChatId: number;
}
