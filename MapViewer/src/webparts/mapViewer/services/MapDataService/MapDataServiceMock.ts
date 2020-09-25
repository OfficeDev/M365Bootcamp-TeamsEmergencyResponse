import Pushpin from '../../model/Location';
import { IMapDataService } from './IMapDataService';

export default class MapDataServiceMock implements IMapDataService {

    public getMapPoints(geocode: boolean): Promise<Pushpin[]> {

        return new Promise<Pushpin[]>((resolve => {
            resolve(this.mockItems);
        }));

    }

    public getEditUrl(): string {
        return "#";
    }

    private mockItems =
        [
            {
                pushpinNumber: 1,
                title: 'Statue of Liberty',
                subtitle: 'National Monument',
                address: 'Statue of Liberty',
                city: 'New York',
                stateProvince: 'NY',
                country: 'USA',
                latitude: 40.6892,
                longitude: -74.0445
            },
            {
                pushpinNumber: 2,
                title: 'Empire State Building',
                subtitle: 'Deco skyscraper',
                address: '20 W 34th St, New York, NY 10001',
                city: 'New York',
                stateProvince: 'NY',
                country: 'USA',
                latitude: 40.7484,
                longitude: -73.9857
            },
            {
                pushpinNumber: 3,
                title: 'Bryant Park',
                subtitle: '9 acre park in Manhattan',
                address: 'Bryant Park, New York, NY',
                city: 'New York',
                stateProvince: 'NY',
                country: 'USA',
                latitude: 40.7536,
                longitude: -73.9832
            }
        ];
}