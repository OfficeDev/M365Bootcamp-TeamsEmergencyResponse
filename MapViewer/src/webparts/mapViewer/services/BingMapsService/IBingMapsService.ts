import IPushpin from '../../model/IPushpin';

export interface IBingMapsServiceProps {
    credentials: string;
}

export interface IBingMapsService {
    geoCode(
        countryRegion: string,
        adminDistrict: string,
        locality: string,
        address: string
    ): Promise<{ latitude: number, longitude: number } | string>;
}