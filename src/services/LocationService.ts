import { Location } from "../database/dto/Location";
import IpFolderModel from "../database/models/IpFolderModel";
import LocationModel from "../database/models/LocationModel";

export class LocationService {

    public static async deleteLocation(locationId: string) {
        const locationModel = await LocationModel.findOne({ where: { id: locationId } });
        if (!locationModel) {
            throw `No location was found with id ${locationId}`;
        }
        await locationModel.destroy();
        return;
    }

    public static async updateLocation(locationId: string, location: Location) {
        const locationModel = await LocationModel.findOne({ where: { id: locationId } });
        if (!locationModel) {
            throw `No location was found with id ${locationId}`;
        }
        locationModel.locationName = location.locationName;
        await locationModel.save();
        return locationModel.toJSON();
    }

    public static async createLocation(location: Location) {
        const locationModel = await LocationModel.create({ locationName: location.locationName });
        return locationModel.toJSON();
    }

    public static async getLocations() {
        const locationList = await LocationModel.findAll({
            include: [{
                model: IpFolderModel,
                include: ["cameras"],
                as: "ipFolders"
            }]
        });
        return locationList;
    }
}