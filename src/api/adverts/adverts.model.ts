import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { iAdvert } from '../../types/Adverts/Advert';
import { UsersModel } from '../users/users.model';

@Table({ tableName: 'adverts' })
export class AdvertsModel extends Model<AdvertsModel, iAdvert> {
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
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UsersModel)
  byUser: UsersModel;

  @Column({
    type: DataType.BOOLEAN,
  })
  isModerated: boolean;

  @Column({
    type: DataType.STRING,
  })
  byModerated: string;
}
