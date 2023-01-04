import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { iAdvert } from '../../types/Adverts/Advert';
import { ImagesModel } from '../images/images.model';
import { ImagesTypeModel } from '../images/images-type.model';

@Table({ tableName: 'adverts' })
export class AdvertsModel extends Model implements iAdvert {
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

  @ForeignKey(() => ImagesModel)
  @Column({
    type: DataType.INTEGER,
    field: 'typeId',
  })
  typeId: number;

  @BelongsTo(() => ImagesModel)
  type: ImagesModel;
}
