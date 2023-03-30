"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpFolderService = void 0;
const IpFolderModel_1 = __importDefault(require("../database/models/IpFolderModel"));
class IpFolderService {
    constructor() { }
    static deleteIpFolder(ipFolderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipFolderModel = yield IpFolderModel_1.default.findOne({ where: { id: ipFolderId } });
            if (!ipFolderModel) {
                throw `No folder was found with id ${ipFolderId}`;
            }
            yield ipFolderModel.destroy();
            return;
        });
    }
    static updateIpFolder(ipFolderId, ipFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipFolderModel = yield IpFolderModel_1.default.findOne({ where: { id: ipFolderId } });
            if (!ipFolderModel) {
                throw `No ip folder was found with id ${ipFolderId}`;
            }
            ipFolderModel.folderName = ipFolder.folderName;
            yield ipFolderModel.save();
            return ipFolderModel.toJSON();
        });
    }
    static createIpFolder(ipFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipFolderModel = yield IpFolderModel_1.default.create({ folderName: ipFolder.folderName, locationId: ipFolder.locationId });
            return ipFolderModel.toJSON();
        });
    }
}
exports.IpFolderService = IpFolderService;
