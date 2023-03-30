"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraHandler = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const CameraService_1 = require("../services/CameraService");
const FOLDERS_TO_WATCH = ['C:/Users/USUARIO/Documents/BairesDev/testeric/cameras'];
class CameraHandler {
    constructor() { }
    static listenToFolderChanges() {
        FOLDERS_TO_WATCH.forEach(folder => {
            const watcher = chokidar_1.default.watch(folder, {
                ignored: /(^|[\/\\])\../,
                persistent: true,
                ignoreInitial: true,
                depth: Infinity // watch all nested folders
            });
            watcher.on('add', (path) => {
                // Wait for the file to be written completely
                setTimeout(() => {
                    this.deleteSiblingFiles(path);
                    this.keepNewestDateFoldersOnly(folder);
                    this.keepNewestFileOnly(folder);
                }, 5000);
            });
        });
    }
    static keepNewestDateFoldersOnly(folder) {
        const folderList = CameraService_1.CameraService.getAllFiles(folder);
        folderList.map((childFolder) => {
            const dateFolders = CameraService_1.CameraService.getAllFiles(childFolder);
            const newestFolder = CameraService_1.CameraService.getNewestFileOrFolder(dateFolders);
            dateFolders.map((folder) => {
                if (folder != newestFolder) {
                    try {
                        fs_1.default.rmSync(folder, { recursive: true, force: true });
                    }
                    catch (err) { }
                }
            });
        });
    }
    static keepNewestFileOnly(folder) {
        const folderList = CameraService_1.CameraService.getAllFiles(folder);
        if (folderList.length) {
            folderList.map((childFolder) => {
                this.keepNewestFileOnly(childFolder);
            });
        }
        const fileList = CameraService_1.CameraService.getAllFiles(folder, false);
        const newestFile = CameraService_1.CameraService.getNewestFileOrFolder(fileList);
        fileList.map((file) => {
            if (file != newestFile) {
                fs_1.default.unlink(file, (err) => {
                    if (err)
                        throw err;
                });
            }
        });
    }
    static deleteSiblingFiles(newFilePath) {
        const splitFilePath = newFilePath.split("\\");
        const newFileName = splitFilePath.pop();
        let newFileParentFolderPath = "";
        splitFilePath.map((item) => {
            newFileParentFolderPath += `${newFileParentFolderPath.length > 0 ? '/' : ''}${item}`;
        });
        const siblingFiles = CameraService_1.CameraService.getAllFiles(newFileParentFolderPath, false);
        siblingFiles.map((item) => {
            if (!item.includes(newFileName)) {
                fs_1.default.unlink(item, (err) => {
                    if (err)
                        throw err;
                });
            }
        });
    }
}
exports.CameraHandler = CameraHandler;
