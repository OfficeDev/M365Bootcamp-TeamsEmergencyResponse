import ILocation, { LocationMapper } from '../../model/Location';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';
import * as Constants from '../../Constants';

export default class MapDataService implements IMapDataService {

    constructor(private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(geocode: boolean): Promise<ILocation[]> {

        const listId = await this.serviceProps.spGraphService.getListId(
            this.serviceProps.siteId, Constants.LIST_NAME
        );

        const points = await this.serviceProps.spGraphService.getListItems<ILocation>(
            this.serviceProps.siteId, listId, new LocationMapper()
        );

        if (geocode) {
            for (let p of points) {
                if ((!p.latitude || !p.longitude) &&
                    p.address || p.city || p.stateProvince || p.country) {
                    let coordinates = await this.serviceProps.bingMapsService.geoCode(
                        p.country, p.stateProvince, p.city, p.address
                    );
                    if (typeof coordinates === 'object') {
                        p.latitude = coordinates.latitude;
                        p.longitude = coordinates.longitude;
                    }
                }
            }
        }

        return (points);

    }

    public getEditUrl() {

        const webUrl = this.serviceProps.context.pageContext.web.absoluteUrl;
        return `${webUrl}/Lists/${Constants.LIST_NAME}/AllItems.aspx`;

    }

}