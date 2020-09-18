import { IMapDataService, IMapDataServiceProps } from './MapDataService/IMapDataService';
import MapDataService from './MapDataService/MapDataService';
import MapDataServiceMock from './MapDataService/MapDataServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getMapDataService(
        environmentType: EnvironmentType,
        serviceProps: IMapDataServiceProps): IMapDataService {

            if (environmentType === EnvironmentType.Local) {
                return new MapDataService(serviceProps);
            } else {
                return new MapDataServiceMock();
            }
    }

}