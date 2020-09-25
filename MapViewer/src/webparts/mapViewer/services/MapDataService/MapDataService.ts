import ILocation, { LocationMapper } from '../../model/Location';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';

export default class MapDataService implements IMapDataService {

    constructor(private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(geocode: boolean): Promise<ILocation[]> {

        const locationMapper = new LocationMapper();

        let listId: string;
        try {
            listId = await this.serviceProps.spGraphService.getListId(
                this.serviceProps.siteId, this.serviceProps.listName
            );    
        }
        catch (error) {
            if (error.statusCode === 404) {
                listId = await this.serviceProps.spGraphService.createList(
                    this.serviceProps.siteId, this.serviceProps.listName,
                    locationMapper
                )
            } else throw(error);
        }

        const points = await this.serviceProps.spGraphService.getListItems<ILocation>(
            this.serviceProps.siteId, listId, locationMapper
        );

        if (geocode) {
            for (let p of points) {
                if ((!p.latitude || !p.longitude) &&
                      p.address || p.city || p.stateProvince || p.country) {
                    
                    // If here, we're missing the geo-coordinates for an item and have
                    // address or other info. Try to geocode it.
                    let coordinates = await this.serviceProps.bingMapsService.geoCode(
                        p.country, p.stateProvince, p.city, p.address
                    );

                    if (typeof coordinates === 'object') {
                        // If here, the geocode was succesful - update the item
                        p.latitude = coordinates.latitude;
                        p.longitude = coordinates.longitude;
                        await this.serviceProps.spGraphService.updateListItem(
                            this.serviceProps.siteId, listId, locationMapper, p.id,
                            {
                                latitude: p.latitude,
                                longitude: p.longitude
                            }
                        );
                    }
                }
            }
        }

        return (points);

    }

    public getEditUrl() {

        const webUrl = this.serviceProps.context.pageContext.web.absoluteUrl;
        return `${webUrl}/Lists/${this.serviceProps.listName}/AllItems.aspx`;

    }

}