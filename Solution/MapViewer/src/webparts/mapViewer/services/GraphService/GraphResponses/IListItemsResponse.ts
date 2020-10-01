import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

// Payload returned by Graph request for list items - unable to find in graph types
export default interface IListItemsReponse {
    value: MicrosoftGraph.ListItem[];
}