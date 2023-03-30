"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const IpFolderModel_1 = __importDefault(require("./IpFolderModel"));
class LocationModel extends sequelize_1.Model {
    static initModel(sequelize) {
        LocationModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            locationName: {
                type: sequelize_1.DataTypes.TEXT,
                unique: true,
                allowNull: false
            },
        }, {
            sequelize,
            underscored: true,
            tableName: "location"
        });
    }
    static associateModel() {
        LocationModel.hasMany(IpFolderModel_1.default, { foreignKey: "locationId", sourceKey: "id", as: 'ipFolders', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
    }
}
exports.default = LocationModel;
