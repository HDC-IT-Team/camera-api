"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const SequelizeConnection_1 = __importDefault(require("../../database/SequelizeConnection"));
const CameraModel_1 = __importDefault(require("./CameraModel"));
const IpFolderModel_1 = __importDefault(require("./IpFolderModel"));
const LocationModel_1 = __importDefault(require("./LocationModel"));
const UserModel_1 = __importDefault(require("./UserModel"));
const sequelize = SequelizeConnection_1.default.getInstance();
UserModel_1.default.initModel(sequelize);
LocationModel_1.default.initModel(sequelize);
IpFolderModel_1.default.initModel(sequelize);
CameraModel_1.default.initModel(sequelize);
LocationModel_1.default.associateModel();
IpFolderModel_1.default.associateModel();
// CameraModel.associateModel();
exports.db = {
    sequelize,
    UserModel: UserModel_1.default,
    LocationModel: LocationModel_1.default,
    IpFolderModel: IpFolderModel_1.default,
    CameraModel: CameraModel_1.default
};
