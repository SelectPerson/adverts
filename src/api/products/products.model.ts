import { Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class ProductsModel extends Model {}
