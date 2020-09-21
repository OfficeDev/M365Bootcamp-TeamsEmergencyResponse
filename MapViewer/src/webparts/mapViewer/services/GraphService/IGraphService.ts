import { MSGraphClient } from '@microsoft/sp-http';
import ILocation from '../../model/ILocation';

export enum FieldType { stringField, numberFieldType }

export interface ISPFieldMapping {
    spFieldName: string;
    resultFieldName: string;
    type: FieldType;
}

// Passed to service in the constructor
export interface IGraphServiceProps {
    graphClient: MSGraphClient;
}

export interface IGraphService {
    getListId(siteId: string, listName: string): Promise<string>;
    getListItems(siteId: string, listId: string, fieldMapping: ISPFieldMapping): 
        Promise<ILocation []>;
}