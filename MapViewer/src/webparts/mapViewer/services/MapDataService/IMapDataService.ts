import Pushpin from '../../model/IPushpin';
import { IGraphService } from '../GraphService/IGraphService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    graphService: IGraphService;
    context: WebPartContext;
    siteId: string;
}

// Public members 
export interface IMapDataService {
    getMapPoints(): Promise<Pushpin[] | string>;
    getEditUrl(): string;
}