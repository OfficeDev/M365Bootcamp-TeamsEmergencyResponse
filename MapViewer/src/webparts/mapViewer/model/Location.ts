import IFieldMapper from './IFieldMapper';

// Model class that describes a pushpin on the map
export default interface ILocation {
    pushpinNumber: number;
    title: string;
    subtitle: string;
    address: string;
    city: string;
    stateProvince: string;
    country: string;
    latitude: number;
    longitude: number;
}

// SharePoint list item details used in mapping
interface IListItem {
    fields: {
        Title: string;
        Subtitle: string;
        Pushpin: number;
        Address: string;
        City: string;
        StateProvince: string;
        Country: string;
        latitude: number;
        longitude: number;
    };
}

// Class to obtain the SharePoint field names (for select) and 
// to map SharePoint list items to model items
export class LocationMapper implements IFieldMapper {

    public getFieldNames(): string {
        return ('Title,Subtitle,Pushpin,Address,City,StateProvince,Country,latitude,longitude');
    }

    public getValuesFromFields(listItems: IListItem[]): ILocation[] {

        var result = listItems.map(i => ({
            pushpinNumber: i.fields.Pushpin,
            title: i.fields.Title,
            subtitle: i.fields.Subtitle,
            address: i.fields.Address,
            city: i.fields.City,
            stateProvince: i.fields.StateProvince,
            country: i.fields.Country,
            latitude: i.fields.latitude,
            longitude: i.fields.longitude
        }));
        return result;
    }
}

