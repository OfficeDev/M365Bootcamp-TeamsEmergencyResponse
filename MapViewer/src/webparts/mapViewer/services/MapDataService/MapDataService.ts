import ILocation from '../../model/ILocation';
import { ISPFieldMapping, FieldType } from '../GraphService/IGraphService';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';

export default class MapDataService implements IMapDataService {

    constructor (private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(): Promise<ILocation[]> {

        const siteId = 'bgtest18.sharepoint.com,da9bc353-675f-48bb-9358-e7e1b91ef1d7,1a558335-60b9-4f58-b3ef-b146b9072683';
        const listName = 'MapViewPoints';

        const listId = await this.serviceProps.graphService.getListId(
            siteId, listName
        );

        const points = await this.serviceProps.graphService.getListItems (
            siteId, listId, 
                {
                    spFieldName: "Title",
                    resultFieldName: "title",
                    type: FieldType.stringField
                }
            
        );
        return new Promise<ILocation[]> ((resolve => {
            resolve (points);
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
            }

        ];



}