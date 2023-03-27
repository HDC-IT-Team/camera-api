import { Request, Response } from "express";
import { Location } from "../database/dto/Location";
import { LocationService } from "../services/LocationService";

export class LocationController {

    public static async deleteLocation(request: Request, response: Response) {
        try {
            const locationId = request.params.locationId;
            await LocationService.deleteLocation(locationId);
            return response.status(200).send();
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async putLocation(request: Request, response: Response) {
        try {
            const locationId = request.params.locationId;
            const location = <Location>request.body;
            const locationModel = await LocationService.updateLocation(locationId, location);
            return response.json(locationModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async postLocation(request: Request, response: Response) {
        try {
            const location = <Location>request.body;
            const newLocationModel = await LocationService.createLocation(location);
            return response.json(newLocationModel);
        } catch (err: any) {
            return response.status(400).json({ error: err.errors ? err.errors : err });
        }
    }

    public static async getLocations(request: Request, response: Response) {
        try {
            const locations = await LocationService.getLocations();
            return response.json(locations);
        } catch (err) {
            return response.status(500).json({ error: err });
        }

    }
}