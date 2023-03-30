"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const njwt_1 = __importDefault(require("njwt"));
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
const bcrypt = __importStar(require("bcrypt"));
const APP_SECRET = process.env.APP_SECRET;
const SALT_ROUNDS = 10;
class AuthService {
    constructor() { }
    static login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield UserModel_1.default.findOne({ where: { username: user.username } });
            const invalidCredentialsErr = "Invalid credentials";
            if (!userModel) {
                throw invalidCredentialsErr;
            }
            const promise = new Promise((resolve, reject) => {
                bcrypt.compare(user.password, userModel.password, (err, result) => {
                    if (result) {
                        const accessToken = this.encodeToken({ userId: userModel.id });
                        resolve(accessToken);
                    }
                    else {
                        reject(invalidCredentialsErr);
                    }
                });
            });
            return promise;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => {
                bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject("The password is required");
                    }
                    try {
                        const userModel = yield UserModel_1.default.create({
                            username: user.username,
                            password: hash
                        });
                        resolve(userModel.toJSON());
                    }
                    catch (err) {
                        reject(err);
                    }
                }));
            });
            return promise;
        });
    }
    static encodeToken(userData) {
        const token = njwt_1.default.create(userData, APP_SECRET);
        token.setExpiration(new Date().getTime() + (60 * 60 * 1000 * 24)); // One day from now
        return token.compact();
    }
}
exports.AuthService = AuthService;
