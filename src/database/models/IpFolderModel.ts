import { Model, Sequelize, DataTypes, Association } from "sequelize";
import { IpFolder } from "../dto/IpFolder";
import CameraModel from "./CameraModel";
import LocationModel from "./LocationModel";

export type IpFolderDto = IpFolder

class IpFolderModel extends Model implements IpFolder {

    public id!: string;
    public folderName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {
        cameras: Association<IpFolderModel, CameraModel>;
    };

    static initModel(sequelize: Sequelize): void {
        IpFolderModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                folderName: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: "ip_folder"
            }
        );
    }

    static associateModel(): void {
        IpFolderModel.belongsTo(LocationModel, { targetKey: 'id', as: 'location' });
        IpFolderModel.hasMany(CameraModel, { foreignKey: 'ipFolderId', sourceKey: 'id', as: 'cameras', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
    }
}

export default IpFolderModel;