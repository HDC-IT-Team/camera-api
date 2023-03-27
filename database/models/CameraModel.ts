import { Model, Sequelize, DataTypes } from "sequelize";
import { Camera } from "../dto/Camera";
import IpFolderModel from "./IpFolderModel";

export type CameraDto = Camera

class CameraModel extends Model implements Camera {

    public id!: string;
    public code!: string;
    public cameraName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {
    };

    static initModel(sequelize: Sequelize): void {
        CameraModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                code: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                cameraName: {
                    type: DataTypes.TEXT,
                    unique: true,
                    allowNull: false
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: "camera"
            }
        );
    }

    static associateModel(): void {
        CameraModel.belongsTo(IpFolderModel, { targetKey: 'id', as: 'ipFolder' });
    }
}

export default CameraModel;