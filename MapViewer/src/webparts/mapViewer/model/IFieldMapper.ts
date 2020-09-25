// Describes a class that can be used by the Graph Service to
// query a specific list and map its items into a model class
export default interface IFieldMapper {
    // Returns a comma-separated list of SP field values
    getFieldNames(): string;
    // Maps an array of SharePoint list items to an array of model objects
    getValuesFromFields(listItems: any[]): any[];
}