import { WebPartContext } from '@microsoft/sp-webpart-base';
import { EnvironmentType } from '@microsoft/sp-core-library';

import { IMapDataService, IMapDataServiceProps } from './MapDataService/IMapDataService';
import MapDataService from './MapDataService/MapDataService';
import MapDataServiceMock from './MapDataService/MapDataServiceMock';

import GraphService from './GraphService/GraphService';

export default class ServiceFactory {

    public static async getMapDataService(
        environmentType: EnvironmentType,
        context: WebPartContext): Promise<IMapDataService> {

            if (environmentType === EnvironmentType.Local) {
                return new MapDataServiceMock();
            } else {

                const graphClient = await context.msGraphClientFactory
                    .getClient();
                const graphService = new GraphService({
                    graphClient: graphClient
                });
                return new MapDataService({ graphService: graphService });
            }
    }



}