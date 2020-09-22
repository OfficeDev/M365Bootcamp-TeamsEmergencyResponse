import IMapper from './IMapper';

export default interface IPushpin {
    pushpinNumber: number;
    title: string;
    subtitle: string;
    latitude: number;
    longitude: number;
}

// Mapping from SharePoint list items
interface IListItem {
        fields: {
            Title: string;
            Subtitle: string;
            Pushpin: number;
            latitude: number;
            longitude: number;
    };
}

export class PushpinMapper implements IMapper {

    public getFieldNames(): string {
        return ('Title,Subtitle,Pushpin,latitude,longitude');
    }

    public getMappedValues(listItems: IListItem[]): IPushpin[] {

        var result = listItems.map(i => ({
            pushpinNumber: i.fields.Pushpin,
            title: i.fields.Title,
            subtitle: i.fields.Subtitle,
            latitude: i.fields.latitude,
            longitude: i.fields.longitude
        }));
        return result;
    }
}

