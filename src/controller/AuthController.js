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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() { }
    static signin(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.body;
            try {
                const authToken = yield AuthService_1.AuthService.login(user);
                return response.json({ authToken });
            }
            catch (err) {
                return response.status(400).json({ error: err });
            }
        });
    }
    static signup(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.body;
            try {
                const userModel = yield AuthService_1.AuthService.createUser(user);
                return response.json(userModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
}
exports.AuthController = AuthController;
