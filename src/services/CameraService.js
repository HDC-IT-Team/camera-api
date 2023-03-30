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
exports.CameraService = void 0;
const fs_1 = __importDefault(require("fs"));
const CameraModel_1 = __importDefault(require("../database/models/CameraModel"));
const MAIN_CAMERAS_PATH = process.env.MAIN_CAMERAS_PATH;
const BASE64_FILE_METADATA = 'data:image/gif;base64,';
class CameraService {
    static deleteCamera(cameraId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cameraModel = yield CameraModel_1.default.findOne({ where: { id: cameraId } });
            if (!cameraModel) {
                throw `No camera was found with id ${cameraId}`;
            }
            yield cameraModel.destroy();
            return;
        });
    }
    static updateCamera(cameraId, camera) {
        return __awaiter(this, void 0, void 0, function* () {
            const cameraModel = yield CameraModel_1.default.findOne({ where: { id: cameraId } });
            if (!cameraModel) {
                throw `No camera was found with id ${cameraId}`;
            }
            cameraModel.code = camera.code;
            cameraModel.cameraName = camera.cameraName;
            yield cameraModel.save();
            return cameraModel.toJSON();
        });
    }
    static createCamera(camera) {
        return __awaiter(this, void 0, void 0, function* () {
            const cameraModel = yield CameraModel_1.default.create({ code: camera.code, cameraName: camera.cameraName, ipFolderId: camera.ipFolderId });
            return cameraModel.toJSON();
        });
    }
    static getPhotoBase64(cameraCode, folderName) {
        const mainFolderPath = `${MAIN_CAMERAS_PATH}/${folderName}`;
        const subFolders = this.getAllFiles(mainFolderPath);
        const newestDateFolder = this.getNewestFileOrFolder(subFolders);
        if (!newestDateFolder) {
            return null;
        }
        const fullCameraPath = `${newestDateFolder}/${cameraCode}`;
        const photos = this.getAllFiles(fullCameraPath, false);
        const newestPhoto = this.getNewestFileOrFolder(photos);
        if (!newestPhoto) {
            return null;
        }
        const base64Photo = this.encodeBase64File(newestPhoto);
        return base64Photo;
    }
    static encodeBase64File(filePath) {
        const base64Photo = `${BASE64_FILE_METADATA}${fs_1.default.readFileSync(filePath, 'base64')}`;
        return base64Photo;
    }
    static getNewestFileOrFolder(files) {
        const newestFileOrFolder = files.sort((a, b) => {
            return fs_1.default.statSync(b).birthtimeMs - fs_1.default.statSync(a).birthtimeMs;
        })[0];
        return newestFileOrFolder;
    }
    static getAllFiles(filesPath, filterFolders = true) {
        const files = fs_1.default.readdirSync(filesPath, { withFileTypes: true })
            .filter(file => filterFolders ? file.isDirectory() : !file.isDirectory())
            .map(file => `${filesPath}/${file.name}`);
        return files;
    }
}
exports.CameraService = CameraService;
