import * as React from 'react';
import styles from './MapViewer.module.scss';
import { IMapDataService } from '../services/MapDataService/IMapDataService';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IMessagePanelProps {
    mapDataService: IMapDataService;
    message: string;
}

export default class MessagePanel extends React.Component<IMessagePanelProps, {}> {

    public render(): React.ReactElement<IMessagePanelProps> {
        return (
            <div className={styles.panel}>
                <PrimaryButton className={styles.button}>Edit pushpins</PrimaryButton>
                <span className={styles.message}>{ this.props.message}</span>
            </div>
        );
    }


    // https://bgtest18.sharepoint.com/sites/EmergencyResponse/Lists/MapViewPoints/AllItems.aspx

    
}



