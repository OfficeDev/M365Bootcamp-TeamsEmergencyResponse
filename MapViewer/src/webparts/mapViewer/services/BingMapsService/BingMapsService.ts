import { IBingMapsService, IBingMapsServiceProps } from './IBingMapsService';
import IPushpin from '../../model/IPushpin';

export default class BingMapsService implements IBingMapsService {

    private credentials;
    constructor(props: IBingMapsServiceProps) {
        this.credentials = props.credentials;
    }

    public async geoCode (address: string) : Promise<IPushpin | string> {
        return ({
            pushpinNumber: 1,
            title: 'Statue of Liberty',
            subtitle: 'National Monument',
            address: 'Statue of Liberty',
            latitude: 40.6892,
            longitude: -74.0445
        })
    }
}