export interface IBingMapsServiceProps {
    credentials: string;
}

export interface IBingMapsService {
    loadBingApi(): Promise<void>;
}