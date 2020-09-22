import IMapper from '../../model/IMapper';
import { IGraphService, IGraphServiceProps } from './IGraphService';
import { GraphError } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

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

    public async getListItems<T>(siteId: string, listId: string, mapper: IMapper):
    Promise<T[]> {

        const client = this.serviceProps.graphClient;

        return new Promise<T[]>((resolve, reject) => {
            const query = client.api(
                `/sites/${siteId}/lists/${listId}/items`
            ).expand(`fields($select%3D${mapper.getFieldNames()})`);

            query.get((error: GraphError, response: any) => {
                if (error) {
                    reject(error);
                } else {
  
                    const result = mapper.getMappedValues(response.value);
                    resolve(result);
                }
            });
        });
    }
}