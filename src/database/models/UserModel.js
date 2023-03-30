"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
    static initModel(sequelize) {
        UserModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: true,
            tableName: "user"
        });
    }
}
exports.default = UserModel;
