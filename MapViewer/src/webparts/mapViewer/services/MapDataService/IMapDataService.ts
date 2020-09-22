import Pushpin from '../../model/IPushpin';
import { IGraphService } from '../GraphService/IGraphService';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    graphService: IGraphService;
    siteId: string;
}

export interface IMapDataService {
    getMapPoints(): Promise<Pushpin[] | string>;
}