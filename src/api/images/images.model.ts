import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ImagesTypeModel } from './images-type.model';

@Table({ tableName: 'images' })
export class ImagesModel extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => ImagesTypeModel)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @BelongsTo(() => ImagesTypeModel)
  type: ImagesTypeModel;

  @Column({ type: DataType.TEXT })
  linkImage: string;
}
