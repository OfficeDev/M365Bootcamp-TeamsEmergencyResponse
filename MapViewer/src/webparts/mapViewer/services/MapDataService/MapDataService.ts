import IPushpin, { PushpinMapper } from '../../model/IPushpin';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';

export default class MapDataService implements IMapDataService {

    constructor(private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(): Promise<IPushpin[]> {

        const listName = 'MapViewPoints';

        const listId = await this.serviceProps.graphService.getListId(
            this.serviceProps.siteId, listName
        );

        const points = await this.serviceProps.graphService.getListItems<IPushpin>(
            this.serviceProps.siteId, listId, new PushpinMapper()
        );
        return (points);

    }

}