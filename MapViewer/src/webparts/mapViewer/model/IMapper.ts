export default interface IMapper {
    // Returns a comma-separated list of SP field values
    getFieldNames(): string;
    // Maps an array of SharePoint list items to an array of model objects
    getMappedValues(listItems: any[]): any[];
}