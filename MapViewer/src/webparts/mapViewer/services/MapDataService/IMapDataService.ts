import Pushpin from '../../model/IPushpin';
import { IGraphService } from '../GraphService/IGraphService';
import { IBingMapsService } from '../BingMapsService/IBingMapsService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    graphService: IGraphService;
    bingMapsService: IBingMapsService;
    context: WebPartContext;
    siteId: string;
}

// Public members 
export interface IMapDataService {
    getMapPoints(): Promise<Pushpin[] | string>;
    getEditUrl(): string;
}