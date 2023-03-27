import fs from 'fs';
import { Camera } from '../database/dto/Camera';
import CameraModel from '../database/models/CameraModel';

const MAIN_CAMERAS_PATH: string = <string>process.env.MAIN_CAMERAS_PATH;
const BASE64_FILE_METADATA = 'data:image/gif;base64,';

export class CameraService {

    public static async deleteCamera(cameraId: string) {
        const cameraModel = await CameraModel.findOne({ where: { id: cameraId } });
        if (!cameraModel) {
            throw `No camera was found with id ${cameraId}`;
        }
        await cameraModel.destroy();
        return;
    }

    public static async updateCamera(cameraId: string, camera: Camera) {
        const cameraModel = await CameraModel.findOne({ where: { id: cameraId } });
        if (!cameraModel) {
            throw `No camera was found with id ${cameraId}`;
        }
        cameraModel.code = camera.code;
        cameraModel.cameraName = camera.cameraName;
        await cameraModel.save();
        return cameraModel.toJSON();
    }

    public static async createCamera(camera: Camera) {
        const cameraModel = await CameraModel.create({ code: camera.code, cameraName: camera.cameraName, ipFolderId: camera.ipFolderId });
        return cameraModel.toJSON();
    }

    public static getPhotoBase64(cameraCode: string, folderName: String) {
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

    private static encodeBase64File(filePath: string) {
        const base64Photo = `${BASE64_FILE_METADATA}${fs.readFileSync(filePath, 'base64')}`;
        return base64Photo;
    }

    public static getNewestFileOrFolder(files: string[]) {
        const newestFileOrFolder = files.sort((a, b) => {
            return fs.statSync(b).birthtimeMs - fs.statSync(a).birthtimeMs;
        })[0];

        return newestFileOrFolder;
    }

    public static getAllFiles(filesPath: string, filterFolders: boolean = true) {
        const files = fs.readdirSync(filesPath, { withFileTypes: true })
            .filter(file => filterFolders ? file.isDirectory() : !file.isDirectory())
            .map(file => `${filesPath}/${file.name}`);

        return files;
    }
}