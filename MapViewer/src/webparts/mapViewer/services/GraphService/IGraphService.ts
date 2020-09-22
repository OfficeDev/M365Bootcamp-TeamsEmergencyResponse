import { MSGraphClient } from '@microsoft/sp-http';
import IMapper from '../../model/IMapper';

export enum FieldType { stringField, numberFieldType }

// Passed to service in the constructor
export interface IGraphServiceProps {
    graphClient: MSGraphClient;
}

export interface IGraphService {
    getListId(siteId: string, listName: string): Promise<string>;
    getListItems<T>(siteId: string, listId: string, mapper: IMapper): 
        Promise<T []>;
}