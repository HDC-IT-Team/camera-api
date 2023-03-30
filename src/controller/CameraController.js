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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraController = void 0;
const CameraService_1 = require("../services/CameraService");
class CameraController {
    static deleteCamera(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cameraId = request.params.cameraId;
                yield CameraService_1.CameraService.deleteCamera(cameraId);
                return response.status(200).send();
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static putCamera(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cameraId = request.params.cameraId;
                const camera = request.body;
                const cameraModel = yield CameraService_1.CameraService.updateCamera(cameraId, camera);
                return response.json(cameraModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static postCamera(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const camera = request.body;
                const cameraModel = yield CameraService_1.CameraService.createCamera(camera);
                return response.json(cameraModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static getPhotoBase64(request, response) {
        const cameraCode = request.query.cameraCode;
        const ipFolderName = request.query.ipFolderName;
        if (!cameraCode) {
            return response.status(400).json({ error: "The camera code must be defined" });
        }
        if (!ipFolderName) {
            return response.status(400).json({ error: "The ip folder name must be defined" });
        }
        try {
            const photo = CameraService_1.CameraService.getPhotoBase64(cameraCode, ipFolderName);
            return response.json({ photo });
        }
        catch (err) {
            return response.status(500).json({ error: err });
        }
    }
}
exports.CameraController = CameraController;
