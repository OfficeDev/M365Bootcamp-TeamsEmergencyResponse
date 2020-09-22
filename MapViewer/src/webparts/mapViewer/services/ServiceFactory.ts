import { WebPartContext } from '@microsoft/sp-webpart-base';
import { EnvironmentType } from '@microsoft/sp-core-library';

import { IMapDataService } from './MapDataService/IMapDataService';
import MapDataService from './MapDataService/MapDataService';
import MapDataServiceMock from './MapDataService/MapDataServiceMock';

import GraphService from './GraphService/GraphService';

export default class ServiceFactory {

    public static async getMapDataService(
        environmentType: EnvironmentType,
        context: WebPartContext): Promise<IMapDataService> {

        if (environmentType === EnvironmentType.Local) {

            // If here we're running locally; use the mock service
            return new MapDataServiceMock();

        } else {

            // If here we're running on SharePoint. Gather the info to instantiate
            // MapDataService

            // 1. Get the graph client from SPFx
            const graphClient = await context.msGraphClientFactory
                .getClient();
            // 2. New up our Graph service (used to call the Graph) and pass in the client
            const graphService = new GraphService({
                graphClient: graphClient
            });
            // 3. Get the current SP site ID (in Teams this is the underlying SP site)
            const siteId = [
                window.location.hostname,
                context.pageContext.site.id.toString(),
                context.pageContext.web.id.toString()
            ].join(',');

            // New up the Map Data Service, passing its dependencies
            return new MapDataService({
                graphService: graphService,
                siteId: siteId
            });
        }
    }



}