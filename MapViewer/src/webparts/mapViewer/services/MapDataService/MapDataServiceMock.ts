import ILocation from '../../model/ILocation';
import { IMapDataService } from './IMapDataService';

export default class MapDataServiceMock implements IMapDataService {

    public getMapPoints(): Promise<ILocation[]> {

        return new Promise<ILocation[]>(resolve => {
            resolve(this.mockItems);
        });
    }

    private mockItems =
        [
            {
                pushpinNumber: 1,
                title: 'Statue of Liberty',
                subtitle: 'National Monument',
                latitude: 40.6892,
                longitude: 74.0445
            },
            {
                pushpinNumber: 2,
                title: 'Empire State Building',
                subtitle: 'Deco skyscraper',
                latitude: 40.7484,
                longitude: 73.9857
            },
            {
                pushpinNumber: 3,
                title: 'Bryant Park',
                subtitle: '9 acre park in Manhattan',
                latitude: 40.7536,
                longitude: 73.9832
            }

        ];



}