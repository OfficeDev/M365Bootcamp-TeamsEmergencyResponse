import IPushpin, { PushpinMapper } from '../../model/IPushpin';
import { IMapDataService, IMapDataServiceProps } from './IMapDataService';
import * as Constants from '../../Constants';

export default class MapDataService implements IMapDataService {

    constructor(private serviceProps: IMapDataServiceProps) { }

    public async getMapPoints(): Promise<IPushpin[]> {

        const listId = await this.serviceProps.graphService.getListId(
            this.serviceProps.siteId, Constants.LIST_NAME
        );

        const points = await this.serviceProps.graphService.getListItems<IPushpin>(
            this.serviceProps.siteId, listId, new PushpinMapper()
        );

        const test = await this.serviceProps.bingMapsService.geoCode("Microsoft Building 36, Redmond, WA");
        return (points);

    }

    public getEditUrl () {

        const webUrl = this.serviceProps.context.pageContext.web.absoluteUrl;
        return `${webUrl}/Lists/${Constants.LIST_NAME}/AllItems.aspx`;

    }

}