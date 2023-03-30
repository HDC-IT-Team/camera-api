import { Model, Sequelize, DataTypes } from "sequelize";
import { User } from "../dto/User";

export type UserDto = User

class UserModel extends Model implements User {

  public id!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
  };

  static initModel(sequelize: Sequelize): void {
    UserModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "user"
      }
    );
  }
}

export default UserModel;