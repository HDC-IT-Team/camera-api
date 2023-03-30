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
const sequelize_1 = require("sequelize");
class SequelizeConnection {
    static getInstance() {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new sequelize_1.Sequelize({
                dialect: 'sqlite',
                storage: './db/camera_db.sqlite'
            });
        }
        return SequelizeConnection.instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = SequelizeConnection.getInstance();
            try {
                yield sequelize.authenticate();
                console.log("Database connection authenticated successfully");
                return sequelize;
            }
            catch (ex) {
                console.log("Error while creation connection to database :: " + ex.message);
                return sequelize;
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = SequelizeConnection.getInstance();
            try {
                yield sequelize.close();
                console.log("Database connection closed successfully");
                return sequelize;
            }
            catch (ex) {
                console.log("Error while closing database connection :: " + ex.message);
                return sequelize;
            }
        });
    }
}
exports.default = SequelizeConnection;
