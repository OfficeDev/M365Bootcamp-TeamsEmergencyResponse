import IPushpin from '../../model/IPushpin';

export interface IBingMapsServiceProps {
    credentials: string;
}

export interface IBingMapsService {
    geoCode(address: string) : Promise<IPushpin | string>;
}