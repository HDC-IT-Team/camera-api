import { Request, Response } from "express";
import { Camera } from "../database/dto/Camera";
import { CameraService } from "../services/CameraService";

export class CameraController {

    public static async deleteCamera(request: Request, response: Response) {
        try {
            const cameraId = request.params.cameraId;
            await CameraService.deleteCamera(cameraId);
            return response.status(200).send();
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async putCamera(request: Request, response: Response) {
        try {
            const cameraId = request.params.cameraId;
            const camera = <Camera>request.body;
            const cameraModel = await CameraService.updateCamera(cameraId, camera);
            return response.json(cameraModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async postCamera(request: Request, response: Response) {
        try {
            const camera = <Camera>request.body;
            const cameraModel = await CameraService.createCamera(camera);
            return response.json(cameraModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static getPhotoBase64(request: Request, response: Response) {
        const cameraCode: any = request.query.cameraCode;
        const ipFolderName: any = request.query.ipFolderName;

        if (!cameraCode) {
            return response.status(400).json({ error: "The camera code must be defined" });
        }

        if (!ipFolderName) {
            return response.status(400).json({ error: "The ip folder name must be defined" });
        }

        try {
            const photo = CameraService.getPhotoBase64(cameraCode, ipFolderName);

            return response.json({ photo });
        } catch (err) {
            return response.status(500).json({ error: err });
        }
    }
}