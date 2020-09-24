import { IBingMapsService, IBingMapsServiceProps } from './IBingMapsService';
import IGetLocationsResponse from './WebServicePayloads/IGetLocationsResponse';

export default class BingMapsService implements IBingMapsService {

    private credentials;
    constructor(props: IBingMapsServiceProps) {
        this.credentials = props.credentials;
    }

    public async geoCode(countryRegion: string,
        adminDistrict: string,
        locality: string,
        address: string
    ): Promise<{latitude: number, longitude: number} | string> {

        const url = `https://dev.virtualearth.net/REST/v1/Locations?countryRegion=${countryRegion}&adminDistrict=${adminDistrict}&locality=${locality}&postalCode=-&addressLine=${address}&maxResults=1&key=${this.credentials}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { "accept": "application/json" },
                mode: 'cors',
                cache: 'default'
            });
    
            if (response.ok) {
                const value: IGetLocationsResponse = await response.json();
                const coordinates = value.resourceSets[0].resources[0].point.coordinates;
                return ({
                    latitude: coordinates[0],
                    longitude: coordinates[1]
                })
            }    
        }
        catch (error) {
            return error;
        }
    }
}