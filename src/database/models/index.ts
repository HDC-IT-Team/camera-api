import SequelizeConnection from "../../database/SequelizeConnection";
import CameraModel from "./CameraModel";
import IpFolderModel from "./IpFolderModel";
import LocationModel from "./LocationModel";
import UserModel from "./UserModel";

const sequelize = SequelizeConnection.getInstance();

UserModel.initModel(sequelize);
LocationModel.initModel(sequelize);
IpFolderModel.initModel(sequelize);
CameraModel.initModel(sequelize);

LocationModel.associateModel();
IpFolderModel.associateModel();
// CameraModel.associateModel();


export const db = {
    sequelize,
    UserModel,
    LocationModel,
    IpFolderModel,
    CameraModel
};
