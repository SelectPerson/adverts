import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'images-type' })
export class ImagesTypeModel extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;
}
