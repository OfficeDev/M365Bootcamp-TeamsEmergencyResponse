import ILocation from '../../model/ILocation';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    context: WebPartContext;
}

export interface IMapDataService {
    getMapPoints(): Promise<ILocation[]> | string;
}