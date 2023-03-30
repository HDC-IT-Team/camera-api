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
exports.IpFolderController = void 0;
const IpFolderService_1 = require("../services/IpFolderService");
class IpFolderController {
    constructor() { }
    static deleteIpFolder(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ipFolderId = request.params.ipFolderId;
                yield IpFolderService_1.IpFolderService.deleteIpFolder(ipFolderId);
                return response.status(200).send();
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static putIpFolder(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ipFolderId = request.params.ipFolderId;
                const ipFolder = request.body;
                const ipFolderModel = yield IpFolderService_1.IpFolderService.updateIpFolder(ipFolderId, ipFolder);
                return response.json(ipFolderModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static postIpFolder(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ipFolder = request.body;
                const ipFolderModel = yield IpFolderService_1.IpFolderService.createIpFolder(ipFolder);
                return response.json(ipFolderModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
}
exports.IpFolderController = IpFolderController;
