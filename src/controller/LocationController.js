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
exports.LocationController = void 0;
const LocationService_1 = require("../services/LocationService");
class LocationController {
    static deleteLocation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = request.params.locationId;
                yield LocationService_1.LocationService.deleteLocation(locationId);
                return response.status(200).send();
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static putLocation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = request.params.locationId;
                const location = request.body;
                const locationModel = yield LocationService_1.LocationService.updateLocation(locationId, location);
                return response.json(locationModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static postLocation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = request.body;
                const newLocationModel = yield LocationService_1.LocationService.createLocation(location);
                return response.json(newLocationModel);
            }
            catch (err) {
                return response.status(400).json({ error: err.errors ? err.errors : err });
            }
        });
    }
    static getLocations(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield LocationService_1.LocationService.getLocations();
                return response.json(locations);
            }
            catch (err) {
                return response.status(500).json({ error: err });
            }
        });
    }
}
exports.LocationController = LocationController;
