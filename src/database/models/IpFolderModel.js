"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CameraModel_1 = __importDefault(require("./CameraModel"));
const LocationModel_1 = __importDefault(require("./LocationModel"));
class IpFolderModel extends sequelize_1.Model {
    static initModel(sequelize) {
        IpFolderModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            folderName: {
                type: sequelize_1.DataTypes.TEXT,
                unique: true,
                allowNull: false
            },
        }, {
            sequelize,
            underscored: true,
            tableName: "ip_folder"
        });
    }
    static associateModel() {
        IpFolderModel.belongsTo(LocationModel_1.default, { targetKey: 'id', as: 'location' });
        IpFolderModel.hasMany(CameraModel_1.default, { foreignKey: 'ipFolderId', sourceKey: 'id', as: 'cameras', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
    }
}
exports.default = IpFolderModel;
