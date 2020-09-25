// Data structure used to get/set/update fields in a SharePoint list
// using the Graph API
// https://docs.microsoft.com/en-us/graph/api/resources/fieldvalueset?view=graph-rest-1.0
export interface IFieldValues {
    fields: any;
}

// JSON required by Graph API to create a list
export interface IColumnDefinition {
    name: string;
    text?: object;
    number?: object;
}

// A class that can be used by the Graph Service to access a specific
// SharePoint list and map its items to/from a model class
// This allows reuse of Graph code across various lists
export default interface IFieldMapper {
    // Returns a comma-separated list of SP field values
    getFieldNames(): string;
    getColumnDefinitions(): IColumnDefinition[];
    // Maps an array of SharePoint list items to an array of model objects
    getValuesFromFields(listItems: any[]): any[];
    setFields(item: any): IFieldValues;
}