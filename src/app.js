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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./database/models");
const SequelizeConnection_1 = __importDefault(require("./database/SequelizeConnection"));
const AuthMIddleware_1 = require("./middleware/AuthMIddleware");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const LocationRoutes_1 = __importDefault(require("./routes/LocationRoutes"));
const CameraRoutes_1 = __importDefault(require("./routes/CameraRoutes"));
const IpFolderRoutes_1 = __importDefault(require("./routes/IpFolderRoutes"));
const camera_handler_1 = require("./handler/camera-handler");
const APP_CORS_IP = process.env.APP_CORS;
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield SequelizeConnection_1.default.connect();
    // once connection is authenticated, sequelize will sync the database models
    // force flag is used to drop the database and create the database again
    models_1.db.sequelize.sync({
        force: false
    });
}))();
camera_handler_1.CameraHandler.listenToFolderChanges();
const server = app.listen(8000, () => {
    console.log(`⚡️[server]: running at http://localhost:${8000}`);
});
process.on('SIGINT', () => {
    SequelizeConnection_1.default.close();
    process.exit();
});
app.use((0, cors_1.default)({
    origin: APP_CORS_IP
}));
app.use(body_parser_1.default.json());
app.use(AuthMIddleware_1.AuthMiddleware.handleToken);
app.use('/api/auth', AuthRoutes_1.default);
app.use('/api/location', LocationRoutes_1.default);
app.use('/api/folder', IpFolderRoutes_1.default);
app.use('/api/camera', CameraRoutes_1.default);
exports.default = server;
