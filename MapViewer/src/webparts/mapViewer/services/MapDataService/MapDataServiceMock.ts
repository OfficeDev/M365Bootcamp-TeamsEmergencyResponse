import Pushpin from '../../model/IPushpin';
import { IMapDataService } from './IMapDataService';

export default class MapDataServiceMock implements IMapDataService {

    public getMapPoints(): Promise<Pushpin[]> {

        return new Promise<Pushpin[]> ((resolve => {
            resolve (this.mockItems);
        }));

    }

    private mockItems =
        [
            {
                pushpinNumber: 1,
                title: 'Statue of Liberty',
                subtitle: 'National Monument',
                latitude: 40.6892,
                longitude: -74.0445
            },
            {
                pushpinNumber: 2,
                title: 'Empire State Building',
                subtitle: 'Deco skyscraper',
                latitude: 40.7484,
                longitude: -73.9857
            },
            {
                pushpinNumber: 3,
                title: 'Bryant Park',
                subtitle: '9 acre park in Manhattan',
                latitude: 40.7536,
                longitude: -73.9832
            },
            // {
            //     pushpinNumber: 4,
            //     title: 'Seattle',
            //     subtitle: 'Test',
            //     latitude: 47.6062,
            //     longitude: -122.3321
            // }

        ];



}