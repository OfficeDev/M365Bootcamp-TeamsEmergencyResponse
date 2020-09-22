import { IBingMapsService, IBingMapsServiceProps } from './IBingMapsService';

class BingMapsService {

    private credentials;
    constructor(props: IBingMapsServiceProps) {
        this.credentials = props.credentials;
    }

    public loadBingApi(): Promise<void> {
        return Promise.resolve();
    }
}