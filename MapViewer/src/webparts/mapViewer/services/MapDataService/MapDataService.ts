import IPushpin, { PushpinMapper } from '../../model/IPushpin';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';

export default class MapDataService implements IMapDataService {

    constructor (private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(): Promise<IPushpin[]> {

        const siteId = 'bgtest18.sharepoint.com,da9bc353-675f-48bb-9358-e7e1b91ef1d7,1a558335-60b9-4f58-b3ef-b146b9072683';
        const listName = 'MapViewPoints';

        const listId = await this.serviceProps.graphService.getListId(
            siteId, listName
        );

        const points = await this.serviceProps.graphService.getListItems<IPushpin> (
            siteId, listId, new PushpinMapper()
        );
        return (points);
        
    }

}