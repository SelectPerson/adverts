import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';

@Table({ tableName: 'tokens' })
export class TokensModel extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.TEXT })
  refreshToken: string;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
