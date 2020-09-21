import ILocation from '../../model/ILocation';
import { IGraphService } from '../GraphService/IGraphService';

// Passed to service in the constructor
export interface IMapDataServiceProps {
    graphService: IGraphService;
}

export interface IMapDataService {
    getMapPoints(): Promise<ILocation[] | string>;
}