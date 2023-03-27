import { IpFolder } from "../database/dto/IpFolder";
import IpFolderModel from "../database/models/IpFolderModel";

export class IpFolderService {

    constructor() { }

    public static async deleteIpFolder(ipFolderId: string) {
        const ipFolderModel = await IpFolderModel.findOne({ where: { id: ipFolderId } });
        if (!ipFolderModel) {
            throw `No folder was found with id ${ipFolderId}`;
        }
        await ipFolderModel.destroy();
        return;
    }

    public static async updateIpFolder(ipFolderId: string, ipFolder: IpFolder) {
        const ipFolderModel = await IpFolderModel.findOne({ where: { id: ipFolderId } });
        if (!ipFolderModel) {
            throw `No ip folder was found with id ${ipFolderId}`;
        }
        ipFolderModel.folderName = ipFolder.folderName;
        await ipFolderModel.save();
        return ipFolderModel.toJSON();
    }

    public static async createIpFolder(ipFolder: IpFolder) {
        const ipFolderModel = await IpFolderModel.create({ folderName: ipFolder.folderName, locationId: ipFolder.locationId });
        return ipFolderModel.toJSON();
    }
}