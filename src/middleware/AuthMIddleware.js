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
exports.AuthMiddleware = void 0;
const njwt_1 = __importDefault(require("njwt"));
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
const APP_SECRET = process.env.APP_SECRET;
class AuthMiddleware {
    static handleToken(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = request.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "").replace("BEARER ", "").replace("bearer ", "");
            if (!token) {
                return next();
            }
            try {
                // DECODING THE TOKEN:
                const decoded = njwt_1.default.verify(token, APP_SECRET);
                ////
                const { userId } = decoded.body;
                const userModel = yield UserModel_1.default.findOne({ where: { id: userId } });
                if (userModel) {
                    request.body.userId = userId;
                }
            }
            catch (e) {
                return next();
            }
            next();
        });
    }
    ;
}
exports.AuthMiddleware = AuthMiddleware;
