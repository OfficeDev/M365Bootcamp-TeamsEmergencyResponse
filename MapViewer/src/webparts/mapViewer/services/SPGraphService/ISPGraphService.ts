import { MSGraphClient } from '@microsoft/sp-http';
import IFieldMapper from '../../model/IFieldMapper';

// Passed to service in the constructor
export interface ISPGraphServiceProps {
    graphClient: MSGraphClient;
}

// Public members
export interface ISPGraphService {
    getListId(siteId: string, listName: string): Promise<string>;
    getListItems<T>(siteId: string, listId: string, mapper: IFieldMapper):
        Promise<T[]>;
    updateListItem(siteId: string, listId: string, mapper: IFieldMapper,
        itemId: number, updates: any): Promise<void | string>;
    createList(siteId: string, listName: string, mapper: IFieldMapper):
        Promise<string>;
}