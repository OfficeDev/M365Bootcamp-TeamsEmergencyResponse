import IFieldMapper, { IFieldValues } from './IFieldMapper';

// Model class that describes a location on the map
export default interface ILocation {
    id: number;
    title: string;
    subtitle: string;
    address: string;
    city: string;
    stateProvince: string;
    country: string;
    latitude: number;
    longitude: number;
}

// Field value set for a location in SharePoint
interface IListItem extends IFieldValues {
    fields: {
        id: number;
        Title: string;
        Subtitle: string;
        Address: string;
        City: string;
        StateProvince: string;
        Country: string;
        latitude: number;
        longitude: number;
    };
}

// Class used by Graph Service to hide list details from the Graph code
export class LocationMapper implements IFieldMapper {

    public getFieldNames(): string {
        return ('id,Title,Subtitle,Address,City,StateProvince,Country,latitude,longitude');
    }

    // Convert field value set to model object
    public getValuesFromFields(listItems: IListItem[]): ILocation[] {

        var result = listItems.map(i => ({
            id: i.fields.id,
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

    // Convert updated properties of model object to field value set
    public setFields(item: any): IListItem {
        let values: any = {};
        if (item.title !== undefined) values.Title = item.title;
        if (item.subtitle !== undefined) values.Subtitle = item.subtitle;
        if (item.address !== undefined) values.Address = item.address;
        if (item.city !== undefined) values.City = item.city;
        if (item.stateProvince !== undefined) values.StateProvince = item.stateProvince;
        if (item.country !== undefined) values.Country = item.country;
        if (item.latitude !== undefined) values.latitude = item.latitude;
        if (item.longitude !== undefined) values.longitude = item.longitude;
        return { fields: values };
    }
}

