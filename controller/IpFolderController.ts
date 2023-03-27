import { Request, Response } from "express";
import { IpFolder } from "../database/dto/IpFolder";
import { IpFolderService } from "../services/IpFolderService";

export class IpFolderController {

    constructor() { }

    public static async deleteIpFolder(request: Request, response: Response) {
        try {
            const ipFolderId = request.params.ipFolderId;
            await IpFolderService.deleteIpFolder(ipFolderId);
            return response.status(200).send();
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async putIpFolder(request: Request, response: Response) {
        try {
            const ipFolderId = request.params.ipFolderId;
            const ipFolder = <IpFolder>request.body;
            const ipFolderModel = await IpFolderService.updateIpFolder(ipFolderId, ipFolder);
            return response.json(ipFolderModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async postIpFolder(request: Request, response: Response) {
        try {
            const ipFolder = <IpFolder>request.body;
            const ipFolderModel = await IpFolderService.createIpFolder(ipFolder);
            return response.json(ipFolderModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }
}