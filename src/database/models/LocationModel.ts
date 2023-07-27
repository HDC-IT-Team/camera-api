import { Model, Sequelize, DataTypes, Association } from "sequelize";
import { Location } from "../dto/Location";
import IpFolderModel from "./IpFolderModel";

export type LocationDto = Location

class LocationModel extends Model implements Location {

    public id!: string;
    public locationName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {
        ipFolders: Association<LocationModel, IpFolderModel>
    };

    static initModel(sequelize: Sequelize): void {
        LocationModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                locationName: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: "location"
            }
        );
    }

    public static associateModel(): void {
        LocationModel.hasMany(IpFolderModel, { foreignKey: "locationId", sourceKey: "id", as: 'ipFolders', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
    }
}

export default LocationModel;