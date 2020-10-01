import ILocation from '../../model/Location';

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