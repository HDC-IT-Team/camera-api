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
exports.LocationService = void 0;
const IpFolderModel_1 = __importDefault(require("../database/models/IpFolderModel"));
const LocationModel_1 = __importDefault(require("../database/models/LocationModel"));
class LocationService {
    static deleteLocation(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const locationModel = yield LocationModel_1.default.findOne({ where: { id: locationId } });
            if (!locationModel) {
                throw `No location was found with id ${locationId}`;
            }
            yield locationModel.destroy();
            return;
        });
    }
    static updateLocation(locationId, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const locationModel = yield LocationModel_1.default.findOne({ where: { id: locationId } });
            if (!locationModel) {
                throw `No location was found with id ${locationId}`;
            }
            locationModel.locationName = location.locationName;
            yield locationModel.save();
            return locationModel.toJSON();
        });
    }
    static createLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const locationModel = yield LocationModel_1.default.create({ locationName: location.locationName });
            return locationModel.toJSON();
        });
    }
    static getLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const locationList = yield LocationModel_1.default.findAll({
                include: [{
                        model: IpFolderModel_1.default,
                        include: ["cameras"],
                        as: "ipFolders"
                    }]
            });
            return locationList;
        });
    }
}
exports.LocationService = LocationService;
