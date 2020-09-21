import { IGraphService, IGraphServiceProps, ISPFieldMapping } from './IGraphService';
import { GraphError } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import ILocation from '../../model/ILocation';
import { DocumentCardTitle } from 'office-ui-fabric-react';

export default class GraphService implements IGraphService {

    constructor(private serviceProps: IGraphServiceProps) { }

    public async getListId(siteId: string, listName: string): Promise<string> {
        const client = this.serviceProps.graphClient;
        
        return new Promise<string>((resolve, reject) => {
            const query = client.api(
                `sites/${siteId}/lists/${listName}`
            ).select('id');
            query.get((error: GraphError, response: MicrosoftGraph.List) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response.id);
                }
            });
        });
    }

    public async getListItems(siteId: string, listId: string, fieldMapping: ISPFieldMapping):
    Promise<ILocation[]> {
        const client = this.serviceProps.graphClient;

        return new Promise<ILocation[]>((resolve, reject) => {
            const query = client.api(
                `/sites/${siteId}/lists/${listId}/items`
            ).expand('fields($select%3DTitle,Subtitle,Pushpin,latitude,longitude)');
            query.get((error: GraphError, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    const result: ILocation[] = [];
                    for (let item of response.value) {
                        result.push({
                            title: item.fields.Title,
                            subtitle: item.fields.Subtitle,
                            pushpinNumber: item.fields.Pushpin,
                            latitude: item.fields.latitude,
                            longitude: item.fields.longitude
                        });
                    }

                    resolve(result);
                }
            });
        });
    }
}