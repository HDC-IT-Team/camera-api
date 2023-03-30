"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const IpFolderModel_1 = __importDefault(require("./IpFolderModel"));
class CameraModel extends sequelize_1.Model {
    static initModel(sequelize) {
        CameraModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            cameraName: {
                type: sequelize_1.DataTypes.TEXT,
                unique: true,
                allowNull: false
            },
        }, {
            sequelize,
            underscored: true,
            tableName: "camera"
        });
    }
    static associateModel() {
        CameraModel.belongsTo(IpFolderModel_1.default, { targetKey: 'id', as: 'ipFolder' });
    }
}
exports.default = CameraModel;
