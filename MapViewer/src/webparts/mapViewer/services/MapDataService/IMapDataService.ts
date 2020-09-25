import Pushpin from '../../model/Location';
import { ISPGraphService } from '../SPGraphService/ISPGraphService';
import { IBingMapsService } from '../BingMapsService/IBingMapsService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    spGraphService: ISPGraphService;
    bingMapsService: IBingMapsService;
    context: WebPartContext;
    siteId: string;
    listName: string;
}

// Public members 
export interface IMapDataService {
    getMapPoints(geocode: boolean): Promise<Pushpin[] | string>;
    getEditUrl(): string;
}