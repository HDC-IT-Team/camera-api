import chokidar from 'chokidar';
import fs from 'fs';
import { CameraService } from "../services/CameraService";

const FOLDERS_TO_WATCH = ['C:/Users/USUARIO/Documents/BairesDev/testeric/cameras'];

export class CameraHandler {
    constructor() { }

    public static listenToFolderChanges() {
        FOLDERS_TO_WATCH.forEach(folder => {
            const watcher = chokidar.watch(folder, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles and hidden folders
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

    private static keepNewestDateFoldersOnly(folder: string) {
        const folderList = CameraService.getAllFiles(folder);

        folderList.map((childFolder) => {
            const dateFolders = CameraService.getAllFiles(childFolder);
            const newestFolder = CameraService.getNewestFileOrFolder(dateFolders);

            dateFolders.map((folder) => {
                if (folder != newestFolder) {
                    try {
                        fs.rmSync(folder, { recursive: true, force: true });
                    } catch (err) { }
                }
            })
        });
    }

    private static keepNewestFileOnly(folder: string) {
        const folderList = CameraService.getAllFiles(folder);

        if (folderList.length) {
            folderList.map((childFolder) => {
                this.keepNewestFileOnly(childFolder);
            })
        }

        const fileList = CameraService.getAllFiles(folder, false);
        const newestFile = CameraService.getNewestFileOrFolder(fileList);

        fileList.map((file) => {
            if (file != newestFile) {
                fs.unlink(file, (err) => {
                    if (err) throw err;
                });
            }
        });
    }

    private static deleteSiblingFiles(newFilePath: string) {
        const splitFilePath = newFilePath.split("\\");
        const newFileName: any = splitFilePath.pop();

        let newFileParentFolderPath = "";
        splitFilePath.map((item) => {
            newFileParentFolderPath += `${newFileParentFolderPath.length > 0 ? '/' : ''}${item}`;
        });

        const siblingFiles = CameraService.getAllFiles(newFileParentFolderPath, false);

        siblingFiles.map((item) => {
            if (!item.includes(newFileName)) {
                fs.unlink(item, (err) => {
                    if (err) throw err;
                });
            }
        });
    }
}